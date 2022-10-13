const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
  })
);



app.get("/" , (req,res)=>{
  res.json("server has started")
})





app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dotenv = require("dotenv");
dotenv.config();


app.use("/jobs", require("./routes/jobPostRoutes"));

const userAPI = require('./routes/user.route');
app.use('/user', userAPI());

mongoose.connect(
  process.env.DB_URL, {
  //type warnings
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

  .then(() => {
    console.log("Mongo DB Connected Successfully");
  })
  .catch((err) => console.log("DB Connection Failed", err));

app.listen(PORT, () => {
  console.log(`Backend App is running on ${PORT}`);
});