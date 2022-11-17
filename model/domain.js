
const mongoose = require('mongoose');
const { Schema } = mongoose


const domainSchema = new Schema({
    user:[{type: Schema.Types.ObjectId,ref: "User",}],
    domain_name:String,
    image:String
});


module.exports = mongoose.model("Domain", domainSchema);
