import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/home/Home";
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import * as React from 'react';
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import Portfolio from "./pages/portfolio/Portfolio";


function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />          
          <Route path="signIn" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />          
          <Route path="resetPassword" element={<ResetPassword />} />          
          <Route path="portfolio/:email" element={<Portfolio />} />          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App