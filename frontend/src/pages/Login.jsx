import React, { useState } from 'react'
import './signup.css'
export default function Login() {
    const [data,setData]= useState({
        email:"",
        password:"",
        
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
 
    const handleSubmit= async(e)=>{
        e.preventDefault()
        let errors ={}
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
   
        setErrors(errors)
    }
  return (
    <>
    <div className='formcenter'>
        <form onSubmit={handleSubmit} className='form'>

      <LabeledInput type="email" name="email" placeholder="Email" onChange={handleChange} value={data.email} error={errors.email} />

      <LabeledInput type="password" name="password" placeholder="Password" onChange={handleChange} value={data.password} error={errors.password} />

     

      <div>
      <button type='submit'className='formbuttton' >Submit</button>
         <button className='formbutttonn'>New user</button>
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