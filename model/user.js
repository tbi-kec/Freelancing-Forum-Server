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
    user_type:{
        type:String,
        required:true,
        enum:['client','freelancer']
    },
    admin_verify:{
        type:Boolean,
        default:false,
    },
    rollno:{
        type:String,
        required:true
    },
    kongu_email: {
        type: String,
        required: true,
        unique: true
    },
    personal_email: {
        type: String,
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
    description: {
        type: String,
    },
    // profile_image: {
    //     type: String,
    // },
    domain:[String],
    rating: {
        type:Number,
        default:0
    },
    linkedin:{
        type:String,
    },
    github:{
        type:String,
    },
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
                ref: "Project",
            },
            message:String,
            notify_type:Number
        }
    ],
    onbord_project: [{
        type: Schema.Types.ObjectId,
        ref: "Project",
    }],
    // payment_status:{
    //     type:Boolean,
    // },
    payment_type:{
        type:String,
    },
    created_on: {
        type: Date,
        default: Date.now,
    }
});


module.exports = mongoose.model("User", userSchema);
