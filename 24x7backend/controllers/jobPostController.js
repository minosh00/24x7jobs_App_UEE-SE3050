
const mongoose = require('mongoose');
const jobPost = require("../models/jobPost");




const getAllJobs = async (req, res) => { 
    try {
        const jobs = await jobPost.find();
        res.status(200).json({jobs:jobs});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}





const updateJobPostByID = async (req, res) => {
    const { id } = req.params;
    const { 
        JobPosition,
        JobDescription,
        JobCompanyName,
        JobType,
        SalaryDetails,
        JobPeriod,
        OtherDetails,
        imageLink
          } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No job position with id: ${id}`);

    const updatedGroups = {   
        JobPosition,
        JobDescription,
        JobCompanyName,
        JobType,
        SalaryDetails,
        JobPeriod,
        imageLink,
        OtherDetails,

        _id:id};

    await jobPost.findByIdAndUpdate(id, updated, { new: true });

    res.json(updated);
}




const RemoveJobs = async (request,response) => {
    await jobPost.findByIdAndRemove(request.params.id,(error,job) => {
        if(error){
            response.status(500).json({ error: error.message });
        }
        else{
            response.status(200).
            json({
                success: true,
                job: job
            })
        }
    })
}





const createJobPost= async (req, res) => {

    const jobs = req.body;


    const newGroups = new jobPost({ ...jobs, creator: req.userId })

    try {
        await newGroups.save();

        res.status(201).json(newGroups );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}







const getjobsById = async (req, res) => { 
    const { id } = req.params;

    try {
        const jobss = await jobPost.findById(id);
        
        res.status(200).json(jobss);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



module.exports ={updateJobPostByID,getAllJobs,RemoveJobs,getjobsById,createJobPost};