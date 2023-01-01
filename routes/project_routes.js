const express=require('express')
const router = express.Router();


const {getallproject,updateProgress,newProject,editProject,deleteProject,project_request,project_request_status,project_developer_request, project_developer_request_rejected} = require('../controllers/project_controller')

router.get('/all',getallproject)
router.post('/',newProject)
router.patch('/edit',editProject)
router.delete('/delete',deleteProject)

//provider
router.post('/provider/request',project_request) //d_id ->developer Id   p_id-> Project Id
router.post('/provider/request/status',project_request_status)

//developer
router.post('/developer/request',project_developer_request)
router.post('/developer/request/rejected',project_developer_request_rejected)

//progress
router.post('/update/progress',updateProgress)

module.exports=router;