import React from 'react'
import { useRecoilState } from 'recoil'
import { pageState } from '../../state'
import Home from '../pages/home'
import Add from '../pages/Add'
import Visualize from '../pages/Visualize'
import Navbar from '../component/nav'
import Insights from '../pages/Insights'



export default function Landing() {
    const [page] = useRecoilState(pageState)
    if(page === "home") return(<> <Navbar /><Home /></>)
    if(page === "add") return(<><Navbar /><Add /></>)
    if(page === "visualize") return(<><Navbar /><Visualize /></>)
    if(page === "insights") return(<><Navbar /><Insights /></>)
  return (
    <Home ></Home>
  )
}
