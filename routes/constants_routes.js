const express=require('express')
const router = express.Router();

const {getdomain} = require('../controllers/constant_controller')

router.get('/domain',getdomain)

module.exports=router;