const express=require('express')
const router = express.Router();
const {requested_project,admin_response} = require('../controllers/admin_controller')

router.get('/requested_project',requested_project)
router.get('/admin_response/:status/:p_id',admin_response)

module.exports=router;