import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Visualize from "./pages/Visualize";
import Add from "./pages/Add";
import Landing from "./modal/Landing";

import { RecoilRoot } from "recoil";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Email from "./Forgot/Email";
import Otp from "./Forgot/Otp";
import Resetpass from "./Forgot/Reset";


export default function App() {
  return (
<>
        <RecoilRoot>
      
        <BrowserRouter>

         <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/add" element={<Add />}></Route>
        <Route path="/visualize" element={<Visualize />}></Route>
       <Route path="/signup" element={<Signup />}></Route>
       <Route path="/login" element={<Login />}></Route>
       <Route path="/email" element={<Email />}></Route>
       <Route path="/otp" element={<Otp />}></Route>
       <Route path="/reset" element={<Resetpass />}></Route>
       






      </Routes>
       </BrowserRouter>
        </RecoilRoot>
</>
  );
}