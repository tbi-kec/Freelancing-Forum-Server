const express=require('express')
const router = express.Router();

const {getdomain, upload} = require('../controllers/constant_controller')

router.get('/domain',getdomain)
router.post('/domain/add',upload)

module.exports=router;