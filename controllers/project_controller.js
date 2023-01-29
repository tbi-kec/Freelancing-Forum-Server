const Project = require('../model/projects')
const ProjectHistory = require('../model/projecthistory')
const User = require('../model/user')

const { notify_user, notify_both_user } = require('../controllers/mail')
const { verify } = require('jsonwebtoken')
const Certificate = require('../model/certificate')
const { uuid } = require('uuidv4');

module.exports.getallproject = async (req, res) => {
    try {
        const project = await Project.find({}).populate('createdBy').populate('requested').populate('developer');
        res.status(200).json(project)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports.newProject = async (req, res) => {
    try {
        const project = new Project({ ...req.body })
        const projecthistory = new ProjectHistory({ project_id: project._id, from: project.createdBy })
        const user = await User.findById(project.createdBy)
        user.projects_given.push(project);
        await user.save();
        await project.save();
        await projecthistory.save()
        res.status(200).json("success");
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports.deleteProject = async (req, res) => {
    const id = req.body.id
    try {
        await Project.findByIdAndDelete(id);
        // await ProjectHistory.findOneAndDelete({ project_id: id });
        res.status(200).json("Deleted Successfully")
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.editProject = async (req, res) => {
    const id = req.body.id
    try {
        const project = await Project.findByIdAndUpdate(id, { ...req.body });
        await project.save()
        res.status(200).json('project added')
    } catch (error) {
        res.status(500).json(error)
    }

}

//developer
module.exports.project_developer_request = async (req, res) => {
    //console.log(...req.params)
    // p_id:project id   d_id:user id (developer)   
    try {
        const { p_id, d_id } = req.body;
        const project = await Project.findById(p_id).populate('createdBy');
        // const projecthistory = ProjectHistory.findById({ project_id: p_id });
        const user = await User.findById(d_id);
        const client=await User.findById(project.createdBy._id);
        client.notification.push({
            p_id: project._id,
            message: `Your Project ${project.title} is Requested By ${user.first_name} ${user.last_name}.`,
            notify_type: 0,
            notify_from: user.first_name + " " + user.last_name
        });
        project.requested.push(user)
        await project.save();
        await client.save();
        await notify_user(project.createdBy.kongu_email, `Your Project ${project.title} is Requested By ${user.first_name} ${user.last_name} .Please Look to your profile to respond to the request`);
        res.status(200).json('Project Requested Successfully!')
    } catch (e) {
        console.log(e.message)
        res.status(500).json(e)
    }
}
module.exports.project_developer_request_rejected = async (req, res) => {
    //console.log(...req.params)
    // p_id:project id   d_id:developer id   
    try {
        const { p_id, d_id } = { ...req.body };
        const project =await Project.findById(p_id).populate('requested').populate('createdBy');
        // const projecthistory = ProjectHistory.findById({ project_id: p_id });
        project.requested = project.requested.remove(d_id);
        project.admin_acceptedOn = "";
        //user
        const user = await User.findById(d_id);
        user.notification.push({
            p_id: project._id,
            message: `Client Rejected Your Request for the project ${project.title}`,
            notify_type: 0,
            notify_from: project.createdBy.first_name + " " + project.createdBy.last_name
        });
        await user.save();
        await project.save();
        res.status(200).json('Freelancer Rejected!')
    } catch (e) {
        console.log(e.message);
        res.status(500).json(e)
    }
}


//provider
module.exports.project_request = async (req, res) => {
    // console.log(...req.params)
    // p_id:project id   d_id: d id (developer)   
    try {
        const { p_id, d_id } = { ...req.body };
        console.log(p_id, d_id)
        const project = await Project.findByIdAndUpdate(p_id, { project_status: 'pending-admin', admin_requestedOn: Date.now(), developer: d_id });
        //const projecthistory = await ProjectHistory.findByIdAndUpdate({ project_id: p_id }, { project_status: 'pending-admin', to: d_id });
        await project.save();
        //await projecthistory.save();
        res.status(200).json('Project Send for Admin Verification!')
    } catch (e) {
        console.log(e.message)
        res.status(500).json(e)
    }
}

module.exports.project_applicant_request_admin = async (req, res) => {
    try {
        const { p_id, d_id } = { ...req.body };
        console.log(p_id, d_id)
        const project = await Project.findByIdAndUpdate(p_id, { project_status: 'pending-admin', admin_requestedOn: Date.now(), developer: d_id });
        //const projecthistory = await ProjectHistory.findByIdAndUpdate({ project_id: p_id }, { project_status: 'pending-admin', to: d_id });
        await project.requested.remove(d_id);
        await project.save();
        //await projecthistory.save();
        res.status(200).json('Project Send for Admin Verification!')
    } catch (e) {
        console.log(e.message)
        res.status(500).json(e)
    }
}
module.exports.project_request_status = async (req, res) => {
    // console.log(...req.params)
    try {
        const { status, p_id, n_id, message } = req.body; //p_id=>project id  n_id=>notification id
        if (status == 'accepted') {
            // mail
            const project = await Project.findByIdAndUpdate(p_id, { project_status: 'assigned', accepted_on: Date.now(), requested: [] }).populate('createdBy').populate("developer");
            //const projecthistory = ProjectHistory.findAndUpdate( p_id , { project_status: 'assigned' }).populate('from');
            console.log(project)
            const user = await User.findById(project.developer._id);
            const provider = await User.findById(project.createdBy._id).populate({
                path: 'notification',
                populate: {
                    path: 'p_id',
                }
            });
            //user notification
            user.notification.remove(n_id);
            user.onbord_project.push(project);
            //provider notification
            provider.notification.push({
                p_id: project,
                message: `Your Project(${project.title}) is Assigned to ${user.first_name}`,
                notify_type: 0,
                notify_from: user.first_name + " " + user.last_name
            });
            provider.onbord_project.push(project);
            await user.save();
            await provider.save();
            await notify_user(project.createdBy.kongu_email, 'Your requested Project is Accepted By the User! Please check your project progress')
            res.status(200).json('You are assigned with new project')
        }
        else {
            // mail
            const project = await Project.findByIdAndUpdate(p_id, { project_status: 'created' }).populate('createdBy').populate("developer");
            // const projecthistory = ProjectHistory.findByIdAndUpdate( p_id , { project_status: 'created', to: '' });
            const user = await User.findById(project.developer._id);
            project.developer = null;
            await project.save();
            const provider = await User.findById(project.createdBy._id).populate({
                path: 'notification',
                populate: {
                    path: 'p_id',
                }
            });
            //user notification
            user.notification.remove(n_id);
            //provider notification
            provider.notification.push({
                p_id: project,
                message: `Your Project(${project.title}) Request is rejected by ${user.first_name},because "${message}"`,
                notify_type: 0,
                notify_from: user.first_name + " " + user.last_name
            });
            await user.save();
            await provider.save();
            await notify_user(project.createdBy.kongu_email, 'Your requested Project is Rejected By the User! Please check your project')

            res.status(200).json('You Rejected the Project!')
        }

    } catch (e) {
        console.log(e.message)
        res.status(500).json(e)
    }
}



//progress
module.exports.updateProgress = async (req, res) => {
    try {
        const status_list = ['assigned', 'partial', 'testing', 'verify', 'completed']
        const { p_id, status } = req.body;
        console.log(req.body);
        const project = await Project.findByIdAndUpdate(p_id, { project_status: status_list[status] }).populate('createdBy').populate('developer');
        const client = await User.findById(project.createdBy._id).populate('onbord_project');
        const developer = await User.findById(project.developer._id).populate('onbord_project').populate('work_history');
        if (status_list[status] == 'completed') {
            const certificate = new Certificate({project:project,certificate_no:uuid()});
            await certificate.save();
            console.log(certificate);
            project.completed_on = Date.now();
            client.onbord_project = client.onbord_project.remove(p_id);
            developer.onbord_project = developer.onbord_project.remove(p_id);
            developer.work_history.push(project);
            await client.save();
            await developer.save();
        }
        if (status_list[status] == 'verify') {
            project.verify_on = Date.now();
        }
        await project.save();
        res.status(200).json('Progress Updated');
    } catch (e) {
        console.log(e.message)
        res.status(500).json(e)
    }
}

module.exports.updatedrive = async (req, res) => {
    try {
        const { drive_link, amount, p_id } = req.body;
        const project = await Project.findByIdAndUpdate(p_id, { drive_link, stipend: amount });
        await project.save();
        res.status(200).json("Success")
    } catch (e) {
        console.log(e.message)
        res.status(500).json(e)
    }
}