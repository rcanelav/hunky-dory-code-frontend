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
import { PostDetails } from '../pages/PostDetails';
import { NewPost } from '../pages/NewPost';
import { SelfProfile } from '../pages/SelfProfile';
import { UserPosts } from '../pages/UserPosts';
import { UserAnswers } from '../pages/UserAnswers';
import { UserProfile } from '../pages/UserProfile';

export const AppRouter = () => {
    const { isUserLoggedIn } = useAuthorization();
    return (
        <Routes>
            <Route path="/" element={ <LandingPage />} />
            <Route path="/search" element={<Main />} />
            <Route path="/contact" element={<LandingPage />} />
            <Route path="/newPost" element={ isUserLoggedIn ? <NewPost /> : <Login />} />
            <Route path="/profile" element={ isUserLoggedIn ? <SelfProfile /> : <Navigate to='/login' />} />
            <Route path="/login" element={  isUserLoggedIn ? <Navigate to='/' /> :  <Login /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/posts/:id" element={ <PostDetails /> } />
            <Route path="/users/:id/posts" element={ <UserPosts /> } />
            <Route path="/users/:id/answers" element={ <UserAnswers /> } />
            <Route path="/users/:id/profile" element={ <UserProfile /> } />
        </Routes>
    )
};
