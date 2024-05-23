 
import axios from "axios";
import { useEffect, useState } from "react"; 
import "./one.css"
import { useRecoilState } from "recoil";
import { dataState } from "../../state";


axios.defaults.baseURL = "http://localhost:5100/";

export default function Home(){
    const[data,setData]=useRecoilState(dataState)
    const [add,setAdd]= useState([]);
    const[total,setTotal]= useState(0)
    const date = new Date();
    const month = date.getMonth();
    var months=["january","February","March","April","May","june","July","August","September","October","November","December"]

    useEffect(()=>{
        async function ServerCall(){
     const response = await axios.get("/exp/alladd",{
        headers:{
            Authorization:localStorage.getItem("token")
        }
        
     });
    //  setAdd(response.data.expense);
     
     const sortedDate = response.data.expense.sort((a,b)=>{
        const dateA= new Date(a.date)
        const dateB = new Date(b.date)
        return dateB.getTime()-dateA.getTime()
    }) 
    setAdd(sortedDate)
    setData(sortedDate)
        } 
     
        ServerCall();
      
    },[]);

  

    useEffect(()=>{
        let temptotal= 0
        add.forEach((item)=>{
            if(parseInt(item.date?.slice(5,7))===month+1){
            temptotal+=item.money;}
        })
        setTotal(temptotal)
    },[add])
return(
    <>
    <div className="tablemoney">
        <h1 className="formcenter">Transactions</h1>
   <h2 className="formcenter">{months[month]}:<span className={`total${total < 0 ? 'negative' : 'positive'}`}>₹{total}</span></h2>
   </div>
    <div className="formcenter">
   

        <table className="table">
            <thead>
                <tr>
                <th className="th">SNo.</th>
                <th className="th">Title</th>
                <th className="th">Expense</th>
                <th className="th">Date</th>
                </tr>
                
            </thead>
        <tbody>
   {
    add.map((item,index)=>(
        <tr key={index}>
           <td className="th"> {index+1}</td>
           <td className="th"> {item.title}</td>
           <td className={`${item.money <0 ? 'negative': 'positive'}`} > <b>{item.money}</b></td>
           <td className="th "> {item.date?.slice(0,10)}</td>
        </tr>
    ))
   }
   </tbody>
 
   </table>


    </div>
    
    </>
)
}