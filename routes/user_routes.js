const express=require('express')
const router = express.Router();

const {login,signup,getAllUsers,sendOtp} = require('../controllers/user_controller')

router.get('/all',getAllUsers)
router.post('/login',login)
router.post('/signup',signup)
router.post('/otp',sendOtp)


module.exports=router;