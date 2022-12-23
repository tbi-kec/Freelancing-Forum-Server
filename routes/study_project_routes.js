const express = require('express')
const router=express.Router()
const {getAllProjects,newProject,updateProject,deleteProject}=require('../controllers/study_project_controllers')
router.get('/all',getAllProjects)
router.post('/:u_id',newProject)
router.delete('/:id',deleteProject)
router.patch('/:id',updateProject)

module.exports=router