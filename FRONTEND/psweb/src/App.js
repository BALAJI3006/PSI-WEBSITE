import React from 'react';
import { useState } from "react";
import { createContext } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
import NoPage from './pages/NoPage';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Clubs from './pages/Clubs';
import Programs from './pages/Programs';
import Contact from './pages/contactus';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
// import Reset from './pages/ResetPassword';
import Forgot from './pages/ForgotPassword';
// import Login from "./components/Login";
import OTPInput from "./pages/OtpInput";
import Recovered from "./pages/recovered";
import Reset from "./pages/ResetPassword";



export default function App() {
  
  return (
    <div>

      <BrowserRouter>
        <Routes>
          
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/programmes" element={<Programs />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/nopage" element={<NoPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/otp" element={<OTPInput />} /> */}
          <Route path="/recovered" element={<Recovered />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/forgot" element={<Forgot />} />

        </Routes>
      </BrowserRouter>

    </div>

  )

}
