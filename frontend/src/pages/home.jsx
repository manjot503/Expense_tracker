 
import axios from "axios";
import { useEffect, useState } from "react"; 
// import Addhome from "./Addhome";

axios.defaults.baseURL = "http://localhost:5100/";

export default function Home(){
    const [add,setAdd]= useState([]);
    

    useEffect(()=>{
        async function ServerCall(){
     const response = await axios.get("/exp/alladd",{
        headers:{
            Authorization:localStorage.getItem("token")
        }
     });
     setAdd(response.data.expense)    
        } 
        ServerCall();
      
    },[])
return(
    <>
    <div>
        <table>
            <thead>
                <tr>
                <th>Title</th>
                <th>Expense</th>
                <th>Date</th>
                </tr>
                
            </thead>
        <tbody>
   {
    add.map((item,index)=>(
        <tr key={index}>
           <td> {item.title}</td>
           <td> {item.money}</td>
           <td> {item.date.slice(0,10)}</td>
        </tr>
    ))
   }
   </tbody>
   </table>
    </div>
    </>
)
}