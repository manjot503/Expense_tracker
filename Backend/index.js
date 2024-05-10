const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors())
app.use(express.json())
const userRouter = require("./Routes/user")

app.use("/user",userRouter)
app.listen(5100,()=>{
    console.log("port connected")
})
