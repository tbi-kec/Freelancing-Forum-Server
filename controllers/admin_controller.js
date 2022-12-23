const Project = require('../model/projects')
const ProjectHistory = require('../model/projecthistory')
const User = require('../model/user')

const { notify_user, notify_both_user } = require('../controllers/mail')

module.exports.requested_project = async (req, res) => {
    try {
        const project = await ProjectHistory.find({ project_status: 'pending-admin' }).populate('from').populate('to').populate('project_id')
        res.status(200).json(project)
    } catch (e) {
        res.status(500).json(e)

    }

}
module.exports.admin_response = async (req, res) => {
    try {
        const { status, p_id } = req.params;
        if (status == 'accepted') {
            const project = await Project.find({ project_status: 'pending-user' }).populate('createdBy').populate('receiver')
            const projecthistory = await ProjectHistory.find({ project_status: 'pending-user' }).populate('from')
            // mail
            await notify_both_user(project.receiver.kongu_email, 'You are Requsted to Do The Project !Pleace Check your Notification Panal', 
            project.createdBy.kongu_email, 'Your requested Project is Accepted By the Admin')
            res.status(200).json('Accepted!')
        }
        else {
            const project = await Project.findByIdAndUpdate(p_id, { project_status: 'created', receiver: '' });
            const projecthistory = await ProjectHistory.findAndUpdate({ project_id: p_id }, { project_status: 'created', to: '' });
            await notify_user( project.createdBy.kongu_email, 'Your requested Project is Rejected By the Admin')
            res.status(200).json('Project Rejected!')
        }
    } catch (e) {
        res.status(500).json(e)
    }

}