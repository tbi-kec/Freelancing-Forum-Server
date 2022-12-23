const Project = require('../model/projects')

const User = require('../model/user')

module.exports.getallproject = async (req, res) => {
    try {
        const project = await Project.find({}).populate('createdBy')
        res.status(200).json(project)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.newProject = async (req, res) => {
    try {
        const project = new Project({ ...req.body })
        await project.save();
        res.status(200).json("success");

    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.deleteProject = async (req, res) => {
    const { id } = req.params.id
    try {
        await Project.findByIdAndDelete(id);
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

module.exports.project_request = async (req, res) => {
    console.log(...req.params)
    // p_id:project id   u_id:user id (provider) s_id: student id (receiver)   
    try {
        const { p_id, u_id, s_id } = req.params;
        const project = Project.findByIdAndUpdate(p_id, { project_status: 'pending-admin', receiver: s_id });
        res.status(200).json('Project Send foe Admin Verification!')
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.project_request_status = async (req, res) => {
    console.log(...req.params)
    try {
        const { status, p_id } = req.params;
        if(status=='accepted'){
            // mail
            const project = Project.findByIdAndUpdate(p_id, { project_status: 'assigned' });
            const user = User.findById(project.receiver);
            user.push(project._id);
            user.save();
            res.status(200).json('You are assigned with new project')
        }
        else{
            // mail
            const project = Project.findByIdAndUpdate(p_id, { project_status: 'created', receiver: '' });
            res.status(200).json('You Rejected the Project!')
        }   
        
    } catch (e) {
        res.status(500).json(e)
    }
}

