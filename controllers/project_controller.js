const Project = require('../model/projects')



module.exports.getallproject = async (req, res) => {
    try {
        const project = await Project.find({}).populate('createdBy')
        res.status(200).json(project)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.newProject = async(req,res)=>{
    try {
        const project =new Project({...req.body})
        await project.save();
        res.status(200).send("success");

    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.deleteProject =async(req,res)=>{
    const {id}=req.body
    try {
        await Project.findByIdAndDelete(id);
        res.status(200).send("Deleted Successfully")
    } catch (error) {
        res.status(500).send(error)
    }
}

module.project.editProject = async(req,res)=>{
    const {id}=req.params
    try {
        const project =await Project.findByIdAndUpdate(id,{...req.body});
        await project.save()
        res.status(200).send('project added')
    } catch (error) {
        res.status(500).send(error)
    }

}