import React from 'react'
import { LandingPage } from '../pages/LandingPage';
import {
    Routes,
    Route
  } from "react-router-dom";
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Main } from '../pages/Main';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={ <LandingPage />} />
            <Route path="/main" element={<Main />} />
            <Route path="/contact" element={<LandingPage />} />
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />
        </Routes>
    )
};
