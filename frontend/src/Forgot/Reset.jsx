
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:5100/";


export default function Resetpass(){
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword:''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = {};
        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 5) {
            errors.password = "Password must be at least 6 characters long";
        }
        if (!formData.confirmPassword) {
            errors.confirmPassword = "Please confirm your password";
        } else if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = "Passwords do not match";
            
        }
        setErrors(errors);

       if(Object.keys(errors).length===0){
        try {
            const email = localStorage.getItem("email")
            // const password = localStorage.getItem("password")
            const response = await axios.put("user/update",{
                email:email,
               password:formData.password
            })
            localStorage.clear()
            alert("password updated successfully")
            navigate("/")
        } catch (error) {
            console.log("Errors",error)
        alert("error while updateing")
        }
       }
    }
    return(
        
            <div className="formcenter " >
   <form onSubmit={handleSubmit} className="form bg-light">
     <h1 className="h">Enter Your New Password</h1>   
            <label className="formname" ><h4>New Password:</h4></label>
             <input type="password" className="forminput" name="password" value={formData.password} onChange={handleChange} />
             {errors.password && <span className="error">{errors.password}</span>}
            
            <label className="formname"><h4>Confirm Password:</h4></label>
             <input type="password" className="forminput" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
             {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
      
      
      <button className='formbuttton'>Done</button>
      
     </form>
     
 </div>
        
    )
}