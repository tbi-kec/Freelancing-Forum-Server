const Project = require('../model/projects')

const User = require('../model/user')

module.exports.requested_project = async (req, res) => {
    try {
        const project = await Project.find({ project_status: 'pending-admin' }).populate('createdBy')
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
            // mail
            res.status(200).json('Accepted!')
        }
        else {
            const project = Project.findByIdAndUpdate(p_id, { project_status: 'created', receiver: '' });
            res.status(200).json('Project Rejected!')
        }
    } catch (e) {
        res.status(500).json(e)
    }

}