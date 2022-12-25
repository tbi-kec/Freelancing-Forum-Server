
        const mongoose = require('mongoose');
        const { Schema } = mongoose


        const studyprojectSchema = new Schema({
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            project_date:String,
            link:{
                type: String,
            },
            technology: {
                type: [String],
            },
            createdBy:{
                type:Schema.Types.ObjectId,
                ref:"User"
            },
            created_on: {
                type: Date,
                default: Date.now,
            }
        });


        module.exports = mongoose.model("StudyProject", studyprojectSchema);
