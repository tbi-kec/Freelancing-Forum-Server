const express=require('express')
const router = express.Router();

const {login,signup,getAllUsers,sendOtp,updateskills,study_project,update_profile,getDomin_user} = require('../controllers/user_controller')
const {change_password,change_password_request} = require('../controllers/forgotten_password_controller')

router.get('/all',getAllUsers)
router.post('/login',login)
router.post('/signup',signup)
router.post('/otp',sendOtp)

//forgotten_password
router.post('/forgotten-password',change_password_request)

router.post('/forgotten-password/:userId/:token',change_password)

router.patch('/update/skills',updateskills)
router.patch('/update/study_project',study_project)
router.post('/update/profile',update_profile)

router.get('/getDomin_user/:domain_name',getDomin_user)
module.exports=router;