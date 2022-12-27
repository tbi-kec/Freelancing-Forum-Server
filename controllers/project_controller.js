const Project = require('../model/projects')
const ProjectHistory = require('../model/projecthistory')
const User = require('../model/user')

const { notify_user, notify_both_user } = require('../controllers/mail')

module.exports.getallproject = async (req, res) => {
    try {
        const project = await Project.find({}).populate('createdBy')
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
    const { id } = req.params.id
    try {
        await Project.findByIdAndDelete(id);
        await ProjectHistory.findOneAndDelete({ project_id: id });
        res.status(200).json("Deleted Successfully")
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.editProject = async (req, res) => {
    const { id } = req.params
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
        const { p_id, d_id } = req.params;
        const project = Project.findById(p_id);
        const projecthistory = ProjectHistory.findById({ project_id: p_id });
        project.requested.push(d_id)
        await project.save();
        res.status(200).json('Project Requested Successfully!')
    } catch (e) {
        res.status(500).json(e)
    }
}
module.exports.project_developer_request_rejected = async (req, res) => {
    //console.log(...req.params)
    // p_id:project id   d_id:developer id   
    try {
        const { p_id, d_id } = req.params;
        const project = Project.findById(p_id).populate('requested');
        const projecthistory = ProjectHistory.findById({ project_id: p_id });
        project.requested = project.requested.filter(item => item._id !== d_id);
        //user
        const user = await User.findById(d_id);
        user.notification = user.notification.push({
            p_id: project._id,
            message: 'Provider Rejected Your Request'
        });
        await user.save();
        await project.save();
        res.status(200).json('Project Requested Successfully!')
    } catch (e) {
        res.status(500).json(e)
    }
}

//provider
module.exports.project_request = async (req, res) => {
   // console.log(...req.params)
    // p_id:project id   d_id: d id (developer)   
    try {
        const { p_id, d_id } = req.body;
        console.log(p_id,d_id)
        const project = await Project.findByIdAndUpdate(p_id, { project_status: 'pending-admin', developer: d_id });
        //const projecthistory = await ProjectHistory.findByIdAndUpdate({ project_id: p_id }, { project_status: 'pending-admin', to: d_id });
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
        const { status, p_id } = req.params;
        if (status == 'accepted') {
            // mail
            const project = Project.findByIdAndUpdate(p_id, { project_status: 'assigned' }).populate('createdBy');
            const projecthistory = ProjectHistory.findAndUpdate({ project_id: p_id }, { project_status: 'assigned' }).populate('from');
            const user = User.findById(project.developer);
            const provider = User.findById(project.createdBy)
            //user notification
            user.notification = user.notification.filter(item => item.p_id !== p_id);
            user.onbord_project.push(project._id);
            //provider notification
            provider.notification = provider.notification.push({
                p_id: project._id,
                message: 'User Accepted'
            });
            // provider.onbord_project.push(project._id);
            await user.save();
            await provider.save();
            await notify_user(project.createdBy.kongu_email, 'Your requested Project is Accepted By the User! Please check your project progress')
            res.status(200).json('You are assigned with new project')
        }
        else {
            // mail
            const project = Project.findByIdAndUpdate(p_id, { project_status: 'created', developer: '' }).populate('createdBy');
            const projecthistory = ProjectHistory.findAndUpdate({ project_id: p_id }, { project_status: 'created', to: '' });
            const user = User.findById(project.developer);
            const provider = User.findById(project.createdBy)
            //user notification
            user.notification = user.notification.filter(item => item.p_id !== p_id);
            //provider notification
            provider.notification = provider.notification.push({
                p_id: project._id,
                message: 'User Rejected'
            });
            await user.save();
            await provider.save();
            await notify_user(project.createdBy.kongu_email, 'Your requested Project is Rejected By the User! Please check your project')

            res.status(200).json('You Rejected the Project!')
        }

    } catch (e) {
        res.status(500).json(e)
    }
}

