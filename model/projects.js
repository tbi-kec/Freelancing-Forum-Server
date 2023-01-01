const mongoose = require('mongoose');
const { Schema } = mongoose

const projectSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    skills: [String],
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
    developer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    requested: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    project_status: {
        type: String,
        enum: ['created', 'pending-admin', 'pending-user', 'assigned', 'partial', 'testing', 'completed'],
        default: 'created'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    end_date: {
        type: Date
    },
    accepted_on: {
        type: Date,
    },
    completed_on: {
        type: Date,
    },
    created_on: {
        type: Date,
        default: Date.now,
    }
});


module.exports = mongoose.model("Project", projectSchema);
