import React from 'react'
import { LandingPage } from '../pages/LandingPage';
import {
    Routes,
    Route
  } from "react-router-dom";
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/contact" element={<LandingPage />} />
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />
        </Routes>
    )
};
