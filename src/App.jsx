import React from "react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./HomePage";
import { Route, Routes } from "react-router-dom";
import SignIn from "./auth/SignIn";
import Dashboard from "./Dashboard";
import SignUp from "./auth/SignUp";
import VerifyInfo from "./auth/VerifyInfo";
import EmailVerificationPage from "./auth/VerifyEmail";
import AddQuestion from "./AddQuestion";
import AllQuestions from "./AllQuestions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/verify-info" element={<VerifyInfo />} />
      <Route path="/verify-email" element={<EmailVerificationPage />} />
      <Route path="/addq" element={<AddQuestion />} />
      <Route path="/allq" element={<AllQuestions />} />
    </Routes>
  );
}

export default App;
