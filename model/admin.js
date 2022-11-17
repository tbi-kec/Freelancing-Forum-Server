const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
    },
    kongu_email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    mobile_number: {
        type: String,
        required:true
    },
    profile_image: {
        type: String,
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now,
    }
});


module.exports = mongoose.model("User", userSchema);
