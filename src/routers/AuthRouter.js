import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../components/auth/LoginPage";
import { RegisterPage } from "../components/auth/RegisterPage";

export const AuthRouter = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-container animate__animated animate__fadeIn">
        <Routes>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/auth/register" replace />} />
        </Routes>
      </div>
    </div>
  );
};
