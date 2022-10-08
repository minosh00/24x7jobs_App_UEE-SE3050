const express = require("express");
const router = express.Router();

const { updateJobPostByID, getAllJobs, RemoveJobs, getjobsById, createJobPost } = require("../controllers/jobPostController");


router.post("/createJobPost", createJobPost);
router.get("/getAllJobs", getAllJobs);
router.get("/getjobsById/:id", getjobsById);
router.patch("/updateJobPostByID/:id", updateJobPostByID);
router.delete("/RemoveJobs/:id", RemoveJobs);


module.exports = router;