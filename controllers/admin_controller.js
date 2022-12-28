const Project = require('../model/projects')
const ProjectHistory = require('../model/projecthistory')
const User = require('../model/user')

const { notify_user, notify_both_user } = require('../controllers/mail')

module.exports.requested_project = async (req, res) => {
    try {
        const project = await Project.find({}).populate('createdBy').populate('developer')
        res.status(200).json(project)
    } catch (e) {
        res.status(500).json(e)

    }
}

module.exports.admin_response = async (req, res) => {
    try {
        const { status, p_id } = req.body
        console.log(p_id,status)
        if (status == 'accepted') {
            const project = await Project.findByIdAndUpdate(p_id,{project_status:"pending-user"}).populate('createdBy').populate('developer')
           // const projecthistory = await ProjectHistory.find({ project_status: 'pending-user' }).populate('from')
           console.log(project);
            const user = await User.findById(project.developer._id)
            const provider=await User.findById(project.createdBy._id)
            
            //user notification
            user.notification.push({
                p_id: project._id,
                message: `Assigned-${project.title}`,
                notify_type:1,
            });
            //provider notification
           provider.notification.push({
                p_id: project._id,
                message: `Accepted By Admin -${project.title}`,
                notify_type:0,
                });
            user.save();
            provider.save();
            project.save();
            // mail
            await notify_both_user(project.developer.kongu_email, 'You are Requsted to Do The Project !Pleace Check your Notification Panal', 
            project.createdBy.kongu_email, 'Your requested Project is Accepted By the Admin')
            res.status(200).json('Accepted!')
        }
        else {
            const project = await Project.findByIdAndUpdate(p_id, { project_status: 'created', developer: null });
           // const projecthistory = await ProjectHistory.findAndUpdate({ project_id: p_id }, { project_status: 'created', to: '' });
            const user = await User.findById(project.createdBy)
            user.notification.push({
                p_id:project._id,
                message:`Rejected-${project.title}`,
                notify_type:0,
            });
            user.save();
            //mail
            await notify_user( project.createdBy.kongu_email, 'Your requested Project is Rejected By the Admin')
            res.status(200).json('Project Rejected!')
        }
    } catch (e) {
        console.log(e.message)
        res.status(500).json(e)
    }

}