const express=require('express')
const router = express.Router();


const {getallproject} = require('../controllers/project_controller')

router.get('/project/all',getallproject)

module.exports=router;