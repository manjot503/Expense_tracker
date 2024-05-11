import React, { useEffect, useState } from "react"
import './one.css'
import { useRecoilState } from "recoil"
import { pageState } from "../../state";
import { useNavigate } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
// import { FaBookSkull } from "react-icons/fa6";
export default function Navbar(){
    const [page,setPage]= useRecoilState(pageState)
    const [mobile,setMobile] = useState(false)

    const handleclick = ()=>{
        setMobile(false);
    }


    return(
        <>
        <div className="Navbar">
            <div >
                <h1 className="logo">QuickBooks</h1>
            </div>
       
            <div >
                <ul className="text">
                    <li>Avtar</li>
                    <li onClick={()=>{setPage("home"); handleclick();}} >Home</li>
                    <li onClick={()=>{setPage("add");handleclick();}}>Add</li>
                    <li onClick={()=>{setPage("visualize");handleclick();}}>Visualize</li>
                </ul>
                    
            </div>
            <div>
            <button className="button">LogOut</button>
            <button className="menu" onClick={()=>setMobile(!mobile)}><HiOutlineMenu /></button>
            </div>
            

        </div>
      

      {mobile &&   <div className="mobile">
                <ol className="mobile-link">
                    <li>Avtar</li>
                    <li onClick={()=>{setPage("home"); handleclick();}}>Home</li>
                    <li onClick={()=>{setPage("add"); handleclick();}}>Add</li>
                    <li onClick={()=>{setPage("visualize"); handleclick();}}>Visualize</li>
                    <li>LogOut</li>
                </ol>
                    
            </div>
}
        </>
    )
}