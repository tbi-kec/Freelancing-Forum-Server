const mongoose = require('mongoose');
const { Schema } = mongoose


const constantSchema = new Schema({
    domain:[String]
});


module.exports = mongoose.model("Constant", constantSchema);
