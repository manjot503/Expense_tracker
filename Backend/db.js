const mongoose = require("mongoose");

require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("db connected")
})

const userSchema = new mongoose.Schema({
  firstName:String,
  lastName:String,
  userName:String,
  email:String,
  password:String,


})

const User = mongoose.model("user",userSchema)

module.exports={User}
