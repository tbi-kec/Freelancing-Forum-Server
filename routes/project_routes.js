const express=require('express')
const router = express.Router();


const {getallproject,newProject,editProject,deleteProject} = require('../controllers/project_controller')

router.get('/all',getallproject)
router.post('/',newProject)
router.patch('/:id',editProject)
router.delete('/',deleteProject)

module.exports=router;