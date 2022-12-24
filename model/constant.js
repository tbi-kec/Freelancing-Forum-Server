const mongoose = require('mongoose');
const { Schema } = mongoose


const constantSchema = new Schema({
    domain:[String],
    dept_short:[{
        dept:String,
        short:String
    }]
});


module.exports = mongoose.model("Constant", constantSchema);
