import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Visualize from "./pages/Visualize";
import Add from "./pages/Add";
import Landing from "./modal/Landing";
import Navbar from "./component/nav";
import { RecoilRoot } from "recoil";
import Signup from "./pages/Signup";
import Login from "./pages/Login";


export default function App() {
  return (
<>
        <RecoilRoot>
        <Navbar />
        <BrowserRouter>

         <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/add" element={<Add />}></Route>
        <Route path="/visualize" element={<Visualize />}></Route>
       <Route path="signup" element={<Signup />}></Route>
       <Route path="login" element={<Login />}></Route>



      </Routes>
       </BrowserRouter>
        </RecoilRoot>
</>
  );
}