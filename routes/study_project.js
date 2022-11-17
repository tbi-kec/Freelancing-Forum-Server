const express = require('mongoose')
const router=express.Router()
const {getAllProjects,newProject,updateProject,deleteProject}=require('../controllers/study_project_controllers')
router.get('/all',getAllProjects)
router.post('/',newProject)
router.delete('/:id',deleteProject)
router.patch('/:id',updateProject)

module.exports=router