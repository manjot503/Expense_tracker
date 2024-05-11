import React from 'react'
import { useRecoilState } from 'recoil'
import { pageState } from '../../state'
import Home from '../pages/home'
import Add from '../pages/Add'
import Visualize from '../pages/Visualize'



export default function Landing() {
    const [page] = useRecoilState(pageState)
    if(page === "home") return<Home />
    if(page === "add") return<Add />
    if(page === "visualize") return<Visualize />
  


   
    
    
  return (
    <Home ></Home>
  )
}
