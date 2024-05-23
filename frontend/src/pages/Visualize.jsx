import { useRecoilState } from "recoil";
import { dataState } from "../../state";
import Doughnutchart from "../component/chart";
import { useEffect, useState } from "react";


const Visualize = () => {
  const[user,setUser]= useState([])
  const [select, setSelect] = useState("month")
  const [data] = useRecoilState(dataState);
  const date = new Date();
  const month = date.getMonth();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let spend = 0
  let earn = 0


  const monthlyExpenditure = data.filter((item) => parseInt(item.date.slice(5, 7)) === month + 1)


  //filter today data

  const today = date.getDate();
  const todayData = data.filter((item) =>
    (parseInt(item.date.slice(5, 7)) === month + 1)
    &&
    (parseInt(item.date.slice(8, 10)) === today))

  //filter week data

  const week = today - 7
  const weekData = data.filter((item) =>
    (parseInt(item.date.slice(5, 7)) === month + 1)
    &&
    (parseInt(item.date.slice(8, 10)) >= week)
    &&
    (parseInt(item.date.slice(8, 10)) <= today))



 
    if (select === "month") {
   
      monthlyExpenditure.forEach((item) => {
        if (item.money > 0) {
          earn += item.money
        }
        else {
          spend += item.money
        }
      });
  
      if (Math.abs(spend) < earn) {
        earn += spend
      }
      else {
        earn = 0
      }
  
    }
    else if (select === "day") {
    
      todayData.forEach((item) => {
        if (item.money > 0) {
          earn += item.money
        }
        else {
          spend += item.money
        }
      });
  
      if (Math.abs(spend) < earn) {
        earn += spend
      }
      else {
        earn = 0
      }
    }
    else {
      weekData.forEach((item) => {
        if (item.money > 0) {
          earn += item.money
        }
        else {
          spend += item.money
        }
      });
  
      if (Math.abs(spend) < earn) {
        earn += spend
      }
      else {
        earn = 0
      }
    }
  // },[select]) 

  useEffect(()=>{
  if(select === "month"){
    setUser(monthlyExpenditure)
  }
  else if(select === "today" ){
    setUser(todayData)
  }
  else{
    setUser(weekData)
  }
  },[select])

  const values = {
    Spend: spend,
    Earn: earn
  }

  const total = Math.abs(spend) + earn
  const spendp = (Math.abs(spend) / total) * 100;
  const earnp = (earn / total) * 100;


  return (
    <>
      <div className="viusualizeNav">
        <div className="tablevius">
          <ul>
            <li className={`livisu ${select === "day" ? "active" : null}`} onClick={() => { setSelect("day") }}>Day</li>
            <li className={`livisu ${select === "week" ? "active" : null}`} onClick={() => { setSelect("week") }}>Week</li>
            <li className={`livisu ${select === "month" ? "active" : null}`} onClick={() => { setSelect("month") }}>Month</li>
          </ul>
        </div>
      </div>
      <div className="allper">

        <div>
          <h1>{months[month]}</h1>
        </div>
        <div >
          <Doughnutchart values={values} title="current month expenditure" />
        </div>
        <div><h2>Spend percentage : {spendp.toFixed(0)}%</h2></div>
        <div><h2>Earn percentage : {earnp.toFixed(0)}%</h2></div>
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
user.map((item,index)=>(
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

export default Visualize;

