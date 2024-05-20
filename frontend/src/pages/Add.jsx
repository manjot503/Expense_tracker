import React, { useEffect, useState } from 'react'
import './signup.css';
import axios from "axios";
import { useRecoilState } from 'recoil';
import { pageState } from '../../state';
import { useNavigate } from 'react-router-dom';


axios.defaults.baseURL = "http://localhost:5100/";

export default function Add() {
  const[page,setPage] = useRecoilState(pageState)
  const [title, setTitle] = useState("");
  const [tempMoney,settempMoney] = useState("")
  const [date,setDate]=useState(new Date().toISOString().slice(0, 10))
  const [type,setType] = useState(false)
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  

  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/")
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(type)

    let errors = {};
    if (!title) {
      errors.title = "Title is required";
    }
    if (!tempMoney) {
      errors.tempMoney = "tempMoney is required";
    } 
    if(!date){
      errors.date = "date is required"
    }
 

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      let money     
      if (type === "spend") {
        money = -tempMoney
      }else{
        money= parseInt(tempMoney)
      }
      try {
        const response = await axios.post("/exp/add", {title,money,date},{
          headers:{
            authorization: localStorage.getItem("token")
          }

        });
        setPage("home");
      } catch (error) { 
        console.error("Error:", error);
        alert("Failed to add expense");
      }
    }
  };

    
  return (
    <div className="formcenter">
      
      <br></br>
      <form onSubmit={handleSubmit} className='form'>
      <h1 className='h'>Add Expense</h1>
       
          <label className='formname'>Title</label>
          <input
            type="text"
            name="title"
            className="forminput"
            placeholder="Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        
        
          <label className='formname'>Spend/Earn</label>
          
          <select onChange={(e)=>setType(e.target.value)} className="forminput">
          <option  >Select</option>
            <option value="spend">Spend</option>
            <option value="earn">Earn</option>
          </select>
      

        
        <label className='formname'>Date</label>

          <input className='forminput' onChange={(e)=>setDate(e.target.value)} name='date' value={date} type='date' placeholder='Date' />
          {errors.date && <span className="error">{errors.date}</span>}

        
        
          <label className='formname'>Expense Amount</label>
          <input
            type="number"
            name="tempMoney"
            className="forminput"
            placeholder="Expenses in ₹/-"
            value={tempMoney}
            onChange={(e)=>settempMoney(e.target.value)}
          />
          {errors.tempMoney && <span className="error">{errors.tempMoney}</span>}
       

        <button type="submit" className="formbuttton">
          Add 
        </button>
      </form>
    </div>
  )
}

