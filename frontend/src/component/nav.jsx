import React from "react"
import './one.css'

import { useRecoilState } from "recoil"
import { pageState } from "../../state";
// import { FaBookSkull } from "react-icons/fa6";
export default function Navbar(){
    const [page,setPage]= useRecoilState(pageState)
    return(
        <>
        <div className="Navbar">
            <div >
                <h1 className="logo">QuickBooks</h1>
            </div>
            <div className="text">
                <ul>
                    <li>Avtar</li>
                    <li onClick={()=>setPage("home")}>Home</li>
                    <li onClick={()=>setPage("add")}>Add</li>
                    <li onClick={()=>setPage("visualize")}>Visualize</li>
                    <li onClick={()=>setPage("login")}>Login</li>
                    <li onClick={()=>setPage("signup")}>Signup</li>

                   
                    
                    </ul>
                    
            </div>
            <div>
            <button className="button">LogOut</button>
            </div>

        </div>
        </>
    )
}