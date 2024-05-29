import React from 'react';
import{Chart, ArcElement, Legend}from 'chart.js';
import{Doughnut} from "react-chartjs-2";
import './one.css';

Chart.register(ArcElement,Legend)

const Doughnutchart = ({values,title})=>{
const data = {
      labels: [
        'Spend',
        'Earn'
      
      ],
      datasets: [{
        label: 'VISUALIZEION',
        data: Object.values(values),
        backgroundColor: [
          'red',
          'green'
        ],
        hoverOffset: 4
      }]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
          title:{
              display: true,
              text: "Source-Imapct (Doughnut Chart)",
              
          },
        legend: {
          display: true, // Set to false to disable the legend
          position: 'bottom',
        },
        
        
      },
      };
    return(
      <>
      
      <div className='doun'>
      {
        values.Earn===0 && values.Spend ===0?
        <div>NO SPEND OR EARNING TODAY</div>:
        <Doughnut data={data} options={options}/>
      }
       </div>
      </>
     
    )
  }

  export default Doughnutchart;