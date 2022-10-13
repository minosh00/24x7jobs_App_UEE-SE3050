
const mongoose = require("mongoose");

const JobSchema = mongoose.Schema({

    
   
    JobPosition:{type:String , required:true},

    JobDescription:{type:String , required:true},

    JobCompanyName:{type:String, required:true},

    JobType:{type:String, required:true},

    SalaryDetails:{type:String, required:true},

    JobPeriod:{type:String, required:true},

    OtherDetails:{type:String, required:true},

    imageLink:{type:String},




},{
    timestamps:true,
}) 

const JobModel =mongoose.model('jobsPoster' , JobSchema)

module.exports = JobModel