const express = require('express')
const router = express.Router();
const { requested_project, admin_response, user_verify, new_admin } = require('../controllers/admin_controller')


router.post('/newadmin', new_admin)
router.get('/requested_project', requested_project)
router.post('/admin_response', admin_response)

//user_verification
router.post('/profile/verification', user_verify)

module.exports = router;