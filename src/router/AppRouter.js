import React from 'react'
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
import { UnloggedLanding } from '../components/unloggedLanding/UnloggedLanding';

export const AppRouter = () => {
    const { isUserLoggedIn } = useAuthorization();
    return (
        <Routes>
            <Route path="/" element={ <UnloggedLanding />} />
            <Route path="/search" element={<Main />} />
            <Route path="/newPost" element={ isUserLoggedIn ? <NewPost /> : <Navigate to='/login' />} />
            <Route path="/profile" element={ isUserLoggedIn ? <SelfProfile /> : <Navigate to='/login' />} />
            <Route path="/login" element={  isUserLoggedIn ? <Navigate to='/' /> :  <Login /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/posts/:id" element={ <PostDetails /> } />
            <Route path="/users/:id/posts" element={ <UserPosts /> } />
            <Route path="/users/:id/answers" element={ <UserAnswers /> } />
            <Route path="/users/:id/profile" element={ <UserProfile /> } />
            <Route path="*" element={ <Main /> } />
        </Routes>
    )
};
