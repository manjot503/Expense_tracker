import axios from "axios";
import { useEffect, useState } from "react"; 
import "./one.css"
import { useRecoilState } from "recoil";
import { dataState } from "../../state";


axios.defaults.baseURL = "http://localhost:5100/";

export default function Home(){
    const[data,setData]=useRecoilState(dataState)
    const [add,setAdd]= useState([]);
    const[total,setTotal]= useState(0);
    const [fromdate, setFromdate ]= useState("");
    const[todate,setTodate]= useState("");
    const[filtereddata,setFiltereddata] = useState([])
   

    useEffect(()=>{
        async function ServerCall(){
     const response = await axios.get("/exp/alladd",{
        headers:{
            Authorization:localStorage.getItem("token")
        }
        
     });
    //  setAdd(response.data.expense);
     
     const sortedDate = response.data.expense.sort((a,b)=>{
        const dateA= new Date(a.date)
        const dateB = new Date(b.date)
        return dateB.getTime()-dateA.getTime()
    }) 
    setAdd(sortedDate)
    setData(sortedDate)
    filterData(sortedDate)
        } 
     
        ServerCall();
      
    },[]);

    const date = new Date();
    const month = date.getMonth();
    var months=["january","February","March","April","May","june","July","August","September","October","November","December"]

    const filterData = (dataToFilter)=>{
        let filtered = dataToFilter;

        if(fromdate){
            filtered = filtered.filter((item)=>new Date(item.date) >= new Date(fromdate))
        }
        if(todate){
            filtered = filtered.filter((item) => new Date(item.date) <= new Date(todate))
        }

        setFiltereddata(filtered)
       

        let temptotal =0;
        filtered.forEach((item)=>{
            temptotal += item.money;
        });
        setTotal(temptotal)
      
    }

  

    useEffect(()=>{
        if( fromdate || todate){
            filterData(add);
        }else{
            const monthlyData = add.filter((item) => parseInt(item.date.slice(5, 7)) === month+1 )
            setFiltereddata(monthlyData)

            let temptotal= 0
            monthlyData.forEach((item)=>{
                // if(parseInt(item.date?.slice(5,7))===month)
                    {
                temptotal+=item.money;}
            })
            setTotal(temptotal)
        }
     
    },[fromdate,todate,add])
return(
    <>


    <div className="tablemoney">
        <h1 className="formcenter">Transactions</h1>
   <h2 className="formcenter">{months[month]}:<span className={`total${total < 0 ? 'negative' : 'positive'}`}>₹{total}</span></h2>
   <div className="formcenter">
   <label className="name">From:</label>
        <input type="date" className="from" value={fromdate} onChange={(e)=> setFromdate(e.target.value)}/>
       
    <label  className="name">To:</label>
        <input type="date" className="to" value={todate} onChange={(e)=>setTodate(e.target.value)}/>
        
        
    </div>
   


   </div>
    <div className="formcenter">
    {filtereddata && filtereddata.length > 0 ? (

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
    filtereddata.map((item,index)=>(
        <tr key={index}>
           <td className="th"> {index+1}</td>
           <td className="th"> {item.title}</td>
           <td className={`${item.money <0 ? 'negative': 'positive'}`} > <b>₹{item.money}</b></td>
           <td className="th "> {item.date?.slice(0,10)}</td>
        </tr>
    ))
   }
   </tbody>
 
   </table>):
   (<h4>NO Data Found</h4>)
   }


    </div>
    
    </>
)
}



