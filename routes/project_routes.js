const express=require('express')
const router = express.Router();


const {getallproject,updateProgress,newProject,editProject,deleteProject,project_request,project_request_status,project_developer_request, project_developer_request_rejected, updatedrive, project_applicant_request_admin} = require('../controllers/project_controller')

router.get('/all',getallproject)
router.post('/',newProject)
router.patch('/edit',editProject)
router.delete('/delete',deleteProject)

//provider
router.post('/provider/request',project_request) //d_id ->developer Id   p_id-> Project Id
router.post('/provider/request/status',project_request_status)

//requested(client click on tick on requested [])
router.post('/provider/applicant/accept',project_applicant_request_admin);

//developer
router.post('/developer/request',project_developer_request)
router.post('/developer/request/rejected',project_developer_request_rejected)

//progress
router.post('/update/progress',updateProgress)
router.post('/update/drivelink',updatedrive)

module.exports=router;