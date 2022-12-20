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
    personal_email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    mobile: {
        type: String,
    },
    department: {
        type: String,
    },
    skills: [{
        name: String,
        level: String
    }],
    discription: {
        type: String,
    },
    profile_image: {
        type: String,
    },
    rating: Number,
    projects_given: [{
        type: Schema.Types.ObjectId,
        ref: "Project",
    }],
    study_project: [{
        type: Schema.Types.ObjectId,
        ref: "StudyProject",
    }],
    work_history: [{
        type: Schema.Types.ObjectId,
        ref: "Project",
    }],
    notification:[
        {
            p_id:{
                type: Schema.Types.ObjectId,
                ref: "StudyProject",
            },
            message:String
        }
    ],
    onbord_project: [{
        type: Schema.Types.ObjectId,
        ref: "Project",
    }],
    payment_status:{
        type:String,
    },
    payment_type:{
        type:String,
    },
    created_on: {
        type: Date,
        default: Date.now,
    }
});


module.exports = mongoose.model("User", userSchema);
