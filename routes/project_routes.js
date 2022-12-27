const express=require('express')
const router = express.Router();


const {getallproject,newProject,editProject,deleteProject,project_request,project_request_status,project_developer_request, project_developer_request_rejected} = require('../controllers/project_controller')

router.get('/all',getallproject)
router.post('/',newProject)
router.patch('/:id',editProject)
router.delete('/:id',deleteProject)

//provider
router.post('/provider/request',project_request) //d_id ->developer Id   p_id-> Project Id
router.get('/provider/request/:p_id/:status',project_request_status)

//developer
router.get('/developer/request/:d_id/:p_id',project_developer_request)
router.get('/developer/request/:d_id/:p_id/rejected',project_developer_request_rejected)

module.exports=router;