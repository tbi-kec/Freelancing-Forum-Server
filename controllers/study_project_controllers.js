const StudyProject = require('../model/studyProject.js');
const user = require('../model/user.js');
module.exports.getAllProjects = async (req, res) => {
    try {
        const project = await StudyProject.find({}).populate('createdBy');
        res.status(200).json(project)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.newProject = async (req, res) => {
    try {
        
        const studyproject = new StudyProject({ ...req.body })
        const user = await user.findById(req.body.createdBy)
        user.push(studyproject)
        await project.save();
        await user.save();
        res.status(200).json("success")
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.deleteProject = async (req, res) => {
    const { id } = req.params
    try {
        const deleted = await StudyProject.findByIdAndDelete(id)
        const user=User.findById(deleted.createdBy);
        const index = user.study_project.indexOf(deleted._id);
        if (index > -1) {
            user.study_project.splice(index, 1);
        }
        user.save();
        res.status(200).json("success")
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.updateProject = async (req, res) => {
    const { id } = req.params
    try {
        const project = await StudyProject.findByIdAndUpdate(id, { ...req.body });
        await project.save();
        res.status(200).json("success")
    } catch (error) {
        res.status(500).json(error)
    }
}