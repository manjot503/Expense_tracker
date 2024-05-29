import React from 'react'
import { dataState } from '../../state';
import { useRecoilState } from 'recoil';
import  Linechart  from '../component/lineChat';

export default function Insights() {

  const [data] = useRecoilState(dataState);
  const date = new Date();
  const day = date.getDate()
  const month = date.getMonth();
  const MonthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
 
  const monthlyExpenditure = data.filter((item) =>
    (parseInt(item.date.slice(5, 7)) === month + 1)
    &&
    (parseInt(item.date.slice(8, 10)) <= day)
    ||
    (parseInt(item.date.slice(5, 7)) === month)
    &&
    (parseInt(item.date.slice(8, 10)) >= day)


  )
  console.log(monthlyExpenditure)

   let tempMonth = month + 1;
  let tempDay = day;
  let LineChartData = new Map();
 
    while(tempMonth>=month || (tempMonth === month && day >= tempDay )){
    let tempSpend = 0;

    data.forEach((item) => {
      if (
        (parseInt(item.date.slice(5, 7)) === tempMonth +1)
         &&
        (parseInt(item.date.slice(8, 10)) === tempDay )
        &&
        item.money < 0
      ) {
        tempSpend += item.money;
      }
    });
LineChartData.set(tempDay,Math.abs(tempSpend))

  if(tempDay === 1){
    tempDay = MonthLength[tempMonth-1]
    tempMonth --;
  }
  else{
    tempDay--;
  }
  }
 return (
    <div className='line'>
      <div className='line1'>
      <Linechart  LineChartData={LineChartData} />
      </div>
      
    </div>
  )
}



