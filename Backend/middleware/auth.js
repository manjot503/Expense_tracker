const jwt = require("jsonwebtoken");
require("dotenv").config();


function Auth(req,res,next){
    const header = req.headers?.authorization
    try{
        const token = jwt.verify(header,process.env.SECRET)
        if(!token){
            return res.status(403).json({
                message:"Connot perfrom operation"
            })
        }
        req.userId=token
        next();
        }
        catch(error){
            return res.status(403).json({
                message:"Connot perfrom operation"
            })
        }
    }
module.exports = Auth;