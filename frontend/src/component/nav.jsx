import React, { useEffect, useState } from "react"
import './one.css'
import { useRecoilState } from "recoil"
import { pageState } from "../../state";
import { useNavigate } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { FaBookSkull } from "react-icons/fa6";
export default function Navbar(){
    const [page,setPage]= useRecoilState(pageState)
    const [mobile,setMobile] = useState(false)
    const[login,setLogin] = useState(false)
    const navigate = useNavigate();
   

    const handleclick = ()=>{
        setMobile(false);
    }
    useEffect(()=>{
        if(localStorage.getItem("token")){
            setLogin(true)
        }
    })
    const avtar = localStorage.getItem("name")?.slice(0,1);

    function logout(){
        localStorage.removeItem("token")
        setLogin(false)
        navigate("/")
    }

    return(
        <>
        <div className="Navbar fixed-top">
            <div >
                <h1 className="logo">QuickBooks<FaBookSkull/></h1>
            </div>
       
            <div >
                <ul className="text">
                {
                    login?(
                        <li className="avtar">{avtar}</li>
                    ):null
                 } 
            <li className={`linav ${page === "home"?"active":null}`} onClick={()=>{setPage("home"); handleclick();}}  >Home</li>
            <li className={`linav ${page === "add"?"active":null}`} onClick={()=>{setPage("add");handleclick();}}>Add</li>
            <li className={`linav ${page === "visualize"?"active":null}`} onClick={()=>{setPage("visualize");handleclick();}}>Visualize</li>
            <li className={`linav ${page === "insights"?"active":null}`} onClick={()=>{setPage("insights");handleclick();}}>Insights</li>
              
                </ul>
                    
            </div>
            <div>
            {
                login?(
                    <button className="button" onClick={ logout }>LogOut</button>
                ):null
            }
             
            <button className="menu" onClick={()=>setMobile(!mobile)}><HiOutlineMenu /></button>
            </div>
            

        </div>
      

      {mobile &&   <div className="mobile">
                <ol className="mobile-link">
                {
                    login?(
                        <li className="avtarmob">{avtar}</li>
                    ):null
                 } 
                    
            <li className={`linav ${page === "home"?"active":null}`} onClick={()=>{setPage("home"); handleclick();}}  >Home</li>
            <li className={`linav ${page === "add"?"active":null}`} onClick={()=>{setPage("add");handleclick();}}>Add</li>
            <li className={`linav ${page === "visualize"?"active":null}`} onClick={()=>{setPage("visualize");handleclick();}}>Visualize</li>
            <li className={`linav ${page === "insights"?"active":null}`} onClick={()=>{setPage("insights");handleclick();}}>Insights</li>
            {
                login?(
                    <button className="logoutmob"  onClick={ logout } >  LogOut </button>  
                ):null
            }  
                </ol>
                    
            </div>
}
        </>
    )
}