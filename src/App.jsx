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

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/verify-info" element={<VerifyInfo />} />
      <Route path="/verify-email" element={<EmailVerificationPage />} />
    </Routes>
  );
}

export default App;
