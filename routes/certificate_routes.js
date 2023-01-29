const express=require('express');
const { newcertificate, generatecertificate } = require('../controllers/certificate_controller');
const router = express.Router();

router.get('/new',newcertificate)
router.post('/generate',generatecertificate)

module.exports=router;