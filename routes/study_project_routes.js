const express = require('express')
const router=express.Router()
const {getAllProjects,newProject,updateProject,deleteProject}=require('../controllers/study_project_controllers')
router.get('/all',getAllProjects)
router.post('/',newProject)
router.delete('/delete',deleteProject)
router.patch('/update',updateProject)

module.exports=router