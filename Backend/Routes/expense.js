const express = require("express");
const cors= require("cors")
// const zod = require("zod");
// const bcrypt = require("bcryptjs")
// const  jwt = require("jsonwebtoken")
const {Add} = require("../db");
const Auth = require("../middleware/auth");

const app =express();
app.use(cors());
app.use(express.json())
require("dotenv").config()
const expenseRouter = express.Router()



expenseRouter.post('/add',Auth,async(req,res)=>{
    const body = req.body
    try {
      const response = await Add.create({
        title:body.title,
        money:body.money,
        userId:req.userId,
        date:body.date


        })
        res.json({message:"success"
      })
        
    } catch (error) {
        res.status(403).json({msg:'error'})
    }
})

expenseRouter.get("/alladd",Auth,async(req,res)=>{
  try {
    const response = await Add.find({
      userId:req.userId
    })
   
    return res.json({expense:response})
  } catch (error) {
    return res.status(403).json({msg:"error while fetching add"})
    
  }
})

module.exports = expenseRouter 