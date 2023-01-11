const express=require('express')
const router = express.Router();
const {otp_sendEmail} =require('../controllers/mail')

const {login,signup,getAllUsers,update_rating,get_user,editProfile,sendOtp,updateskills,study_project,update_profile,getDomin_user, delete_notification, getDept_user} = require('../controllers/user_controller')
const {change_password,change_password_request} = require('../controllers/forgotten_password_controller')

router.get('/',getAllUsers)
router.get('/:id',get_user)
router.post('/login',login)
router.post('/signup',signup)
router.post('/otp',otp_sendEmail)

//notification dlelte
router.post('/notification/delete',delete_notification)

//forgotten_password
router.post('/forgotten-password',change_password_request)

router.post('/reset/forgotten-password/',change_password)

router.patch('/update/skills',updateskills)
router.patch('/edit/profile/:id',editProfile)
router.patch('/update/study_project',study_project)
router.post('/update/profile',update_profile)

//user show
router.post('/getDomin_user/',getDomin_user)
router.post('/dept_user/',getDept_user)

//rating
router.post('/rating',update_rating)

module.exports=router;