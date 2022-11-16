
const mongoose = require('mongoose');
const { Schema } = mongoose


const projectSchema = new Schema({
    project_title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    technology_needed: {
        type: [String],
        required: true
    },
    approval: {
        type: Boolean,
        required: true
    },
    stipend: {
        type: Number,
    },
    tasks: {
        type: [{
            title:String,
            start_time:Date,
            dead_line:Date,
            commpleted:Boolean
        }],
    },
    project_status: {
        type: Boolean,
        default:false
    },
    created_on: {
        type: Date,
        default: Date.now,
    }
});


module.exports = mongoose.model("Project", projectSchema);
