const express=require('express')
const router = express.Router();
const {requested_project,admin_response} = require('../controllers/admin_controller')

router.get('/requested_project',requested_project)
router.post('/admin_response',admin_response)

module.exports=router;