const mongoose = require("mongoose");
//Write missing code here
mongoose
  .connect(
   "mongodb+srv://bhadraunnim:bhadraunnim@cluster0.nxcokgk.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
