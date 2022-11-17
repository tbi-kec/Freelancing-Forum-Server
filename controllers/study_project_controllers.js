const StudyProject =require('../model/studyProject.js')
module.exports.getAllProjects = async(req,res)=>{
    try {
        const project=await StudyProject.find({}).populate('createdBy');
        res.status(200).json(project)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.newProject =async(req,res)=>{
    try {
        const project= new StudyProject({...req.body})
        await project.save();
        res.status(200).json("success")
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.deleteProject = async(req,res) =>{
    const {id}=req.params
    try {
        await StudyProject.findByIdAndDelete(id)
        res.status(200).json("success")
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.updateProject = async(req,res) =>{
    const {id}=req.params
    try {
        const project=await StudyProject.findByIdAndUpdate(id,{...req.body});
        await project.save();
        res.status(200).json("success")
    } catch (error) {
        res.status(500).send(error)
    }
}