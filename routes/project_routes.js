const express=require('express')
const router = express.Router();


const {getallproject,newProject,editProject,deleteProject,project_request,project_request_status,project_developer_request, project_developer_request_rejected} = require('../controllers/project_controller')

router.get('/all',getallproject)
router.post('/',newProject)
router.patch('/edit',editProject)
router.delete('/delete',deleteProject)

//provider
router.post('/provider/request',project_request) //d_id ->developer Id   p_id-> Project Id
router.get('/provider/request/status',project_request_status)

//developer
router.get('/developer/request/:d_id/:p_id',project_developer_request)
router.get('/developer/request/:d_id/:p_id/rejected',project_developer_request_rejected)

module.exports=router;