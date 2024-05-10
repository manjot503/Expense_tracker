import React, { useState } from 'react'
import './signup.css'
export default function Signup() {
    const [data,setData]= useState({
        firstName:"",
        lastName:"",
        userName:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const[errors,setErrors]=useState({})

    const handleChange = (e)=>{
        const{name,value}=e.target;
        setData({
            ...data,
            [name]:value
        })
        setErrors({...errors,[name]:""})
        
    }
    function capitalizeFirstLetter(e){
      return e.charAt(0).toUpperCase +e.slice(1);
    }
    
    const handleSubmit= async(e)=>{
        e.preventDefault()
        let errors ={}

        if(!data.firstName ){
            errors.firstName ="FirstName is required"
        }
        if(!data.lastName){
            errors.lastName="LastName is required"
        }
        if(!data.userName){
            errors.userName="UserName is required"
        }
        if(!data.email){
            errors.email="Email is required"
        }else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "Email address is invalid";
        }
        if(!data.password){
            errors.password="Password is required"
        } else if(data.password.length<5){
            errors.password = "Password must be at least 5 characters long";

        }      
        if(!data.confirmPassword){
            errors.confirmPassword="ConfirmPassword is required"
        }else if(data.confirmPassword !== data.password){
            errors.confirmPassword="Passwords do not match"
        }
        setErrors(errors)
    }
  return (
    <>
    <div className='formcenter'>
        <form onSubmit={handleSubmit} className='form'>
      <LabeledInput type="text" name="firstName" placeholder="FirstName" onChange={handleChange} value={data.firstName} error={errors.firstName} letter={capitalizeFirstLetter} />

      <LabeledInput type="text" name="lastName" placeholder="LastName" onChange={handleChange} value={data.lastName} error={errors.lastName} />

      <LabeledInput type="text" name="userName" placeholder="UserName" onChange={handleChange} value={data.userName} error={errors.userName} />

      <LabeledInput type="email" name="email" placeholder="Email" onChange={handleChange} value={data.email} error={errors.email} />

      <LabeledInput type="password" name="password" placeholder="Password" onChange={handleChange} value={data.password} error={errors.password} />

      <LabeledInput type="password" name="confirmPassword" placeholder="ConfirmPassword" onChange={handleChange} value={data.confirmPassword} error={errors.confirmPassword} />
      <div>
      <button type='submit'className='formbuttton' >Submit</button>
         <button className='formbutttonn'>login</button>
</div>
   
        </form>
    </div>
    </>
  )
}


function LabeledInput({type,placeholder,name,value,onChange,error,letter}){
    return(
        <label>
            <h6 className='formname'>{placeholder}</h6>
        <input className="forminput" type={type} placeholder={placeholder} name={name} value={value} onChange={onChange}lletter={letter} ></input>
        {error && <span className='error'>{error}</span>}
        </label>
    )
}