const Constant = require('../model/constant')


module.exports.getdomain=async()=>{
    const result = await Constant.find({});
    res.status(200).json({ result: result.domain })
}