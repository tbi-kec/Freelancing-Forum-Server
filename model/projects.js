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
    stipend: {
        type: Number,
    },
    tasks: {
        type: [{
            title: String,
            start_time: Date,
            dead_line: Date,
            completed: Boolean
        }],
    },
    receiver:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    project_status: {
        type: String,
        enum: ['created', 'pending-admin', 'pending-user', 'assigned', 'partial', 'completed'],
        default: 'created'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    created_on: {
        type: Date,
        default: Date.now,
    }
});


module.exports = mongoose.model("Project", projectSchema);
