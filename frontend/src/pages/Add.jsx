import React, { useState } from 'react'
import './signup.css';
import axios from "axios";
import { useRecoilState } from 'recoil';
import { pageState } from '../../state';


axios.defaults.baseURL = "http://localhost:5100/";

export default function Login() {
  const[page,setPage] = useRecoilState(pageState)
    const [data,setData]= useState({
        title:"",
        money:"",
        
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
        if(!data.title){
            errors.title="title is required"
        }
        if(!data.money){
            errors.money="money is required"
        }     
   
        setErrors(errors)

        
        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post("exp/add", data,{
                  headers: {
                        authorization: localStorage.getItem("token")
                      },
                      
                      
                });
              setPage("home")

                
            } catch (error) {
                console.error("Error:", error);
                alert("falied add expense")         
            }

        }
    };
    
  return (
    <>
    <div className='formcenter'>
        <form onSubmit={handleSubmit} className='form'>
          <h1 className='h'>Add Expense</h1>

      <LabeledInput type="text" name="title" placeholder="Title" onChange={handleChange} value={data.title} error={errors.title} />
      <div>
        <select>
          <option>Select</option>
          <option value="spend">spend</option>
          <option value="earn">Earn</option>
        </select>
      </div>

      <LabeledInput type="number" name="money" placeholder="Money" onChange={handleChange} value={data.money} error={errors.money} />

     

      <div>
      <button type='submit'className='formbuttton' >Submit</button>
    
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


