const mongoose = require('mongoose');
const { Schema } = mongoose

const deletedUserSchema = new Schema({
    rejected_on: Date,
    reason: String,
    first_name: {
        type: String,
        
    },
    last_name: {
        type: String,
    },
  
    rollno:{
        type:String,
        
    },
    kongu_email: {
        type: String,
      
    },
    personal_email: {
        type: String,
    },
    
    mobile: {
        type: String,
    },
    department: {
        type: String,
    },
    
    
    linkedin:{
        type:String,
    },
    github:{
        type:String,
    },
    
 
    created_on: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("DeletedUser", deletedUserSchema);
