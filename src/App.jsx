import React from "react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./HomePage";
import { Route, Routes } from "react-router-dom";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import VerifyInfo from "./auth/VerifyInfo";
import EmailVerificationPage from "./auth/VerifyEmail";
import Dashboard from "./dashboard/Dashboard";
import AddQuestion from "./dashboard/AddQuestion";
import AllQuestions from "./dashboard/AllQuestions";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import Profile from "./dashboard/Profile";


  
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      
      <Route path="/verify-info" element={<VerifyInfo />} />
      <Route path="/verify-email" element={<EmailVerificationPage />} />
      <Route path="/addq" element={<AddQuestion />} />
      <Route path="/allq" element={<AllQuestions />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;