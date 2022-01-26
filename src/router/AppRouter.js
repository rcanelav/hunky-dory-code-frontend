import React from 'react'
import { LandingPage } from '../pages/LandingPage';
import {
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Main } from '../pages/Main';
import { useAuthorization } from '../hooks/useAuthorization';

export const AppRouter = () => {
    const { isUserLoggedIn } = useAuthorization();
    return (
        <Routes>
            <Route path="/" element={ <LandingPage />} />
            <Route path="/search" element={<Main />} />
            <Route path="/contact" element={<LandingPage />} />
            <Route path="/login" element={  isUserLoggedIn ? <Navigate to='/' /> :  <Login /> } />
            <Route path="/register" element={ <Register /> } />
        </Routes>
    )
};
