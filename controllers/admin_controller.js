const Project = require('../model/projects')
const ProjectHistory = require('../model/projecthistory')

const User = require('../model/user')

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
            const project = await Project.find({ project_status: 'pending-user' }).populate('createdBy')
            const projecthistory = await ProjectHistory.find({ project_status: 'pending-user' }).populate('from')
            // mail
            res.status(200).json('Accepted!')
        }
        else {
            const project = await Project.findByIdAndUpdate(p_id, { project_status: 'created', receiver: '' });
            const projecthistory = await ProjectHistory.findAndUpdate({ project_id: p_id }, { project_status: 'created', to: '' });
            res.status(200).json('Project Rejected!')
        }
    } catch (e) {
        res.status(500).json(e)
    }

}