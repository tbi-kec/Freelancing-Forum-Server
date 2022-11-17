const express=require('express')
const router = express.Router();


const {getallproject,newProject,editProject,deleteProject,project_request,project_request_status} = require('../controllers/project_controller')

router.get('/all',getallproject)
router.post('/',newProject)
router.patch('/:id',editProject)
router.delete('/:id',deleteProject)


router.get('/project/request/:u_id/:s_id/:p_id',project_request)
router.get('/project/request/:p_id/:status',project_request_status)


module.exports=router;