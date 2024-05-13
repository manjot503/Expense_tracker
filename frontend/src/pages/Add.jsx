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
  const [tempMoney,settempMoney] = useState(0)
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
 

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      let money     
      if (type === "spend") {
        money = -tempMoney
      }else{
        money= parseInt(tempMoney)
      }
      try {
        const response = await axios.post("/exp/add", {title,money},{
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
      <h2>Add Expense</h2>
       
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
        
        <div className="formselect">
          <select onChange={(e)=>setType(e.target.value)} >
          <option >Select</option>
            <option value="spend">Spend</option>
            <option value="earn">Earn</option>
          </select>
        </div>
        
          <label className='formname'>tempMoney</label>
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

