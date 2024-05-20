import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { dateState } from '../../state';

export default function Visualize() {
 const [data]= useRecoilState(dateState);

  const date = new Date();
  const month = date.getMonth();
  var months=["january","February","March","April","May","june","July","August","September","October","November","December"]

  const monthlydata = data.filter((item)=>parseInt(item.date?.slice(0,10))===month+1)

  let spend =0;
  let earn=0;

  monthlydata.forEach((item) => {
    if(item.money >0){
      earn += item.money
    }else{
      spend+=item.money
    }
  });
  if(spend<earn){
    earn+=spend
  }else{
    earn=0
  }

  console.log(earn)
  console.log(spend)
  return (
    <div>{months[month]}</div>
  )
}
