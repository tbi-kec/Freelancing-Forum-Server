const express=require('express')
const router = express.Router();
const {requested_project,admin_response, user_verify} = require('../controllers/admin_controller')

router.get('/requested_project',requested_project)
router.post('/admin_response',admin_response)

//user_verification
router.post('/profile/verification',user_verify)

module.exports=router;