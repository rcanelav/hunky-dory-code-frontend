import axios  from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { facebookAuthProvider, googleAuthProvider, startSignIn } from '../firebase/firebaseConfig';

const { REACT_APP_API_URL } = process.env;
const authContext = createContext();

function useAuthorization( params ){
    const context = useContext( authContext );
    if( !context ){
        return console.log( 'context is not defined' );
    }
    return context;
}

function AuthProvider( props ){
    const [ userSession, setUserSession ] = useState( localStorage.getItem( 'userSession' ) );
    const [ userProfile, setUserProfile ] = useState( localStorage.getItem( 'userProfile' ) || {} );
    const [ isUserLoggedIn, setIsUserLoggedIn ] = useState( false );
    const navigate = useNavigate();

    useEffect(() => {
        if (userSession) {
            async function getUserProfile() {
                try {
                const response = await axios({
                    method: "GET",
                    url: `${REACT_APP_API_URL}/api/v1/auth/current`,
                    headers: { Authorization: `Bearer ${userSession}` },
                  });

                setUserProfile(response?.data);
                setIsUserLoggedIn(true);
                } catch (error) {
                    console.log("ERROR: ", error);
                    localStorage.removeItem( 'userSession' );
                    setUserSession(null);
                    setIsUserLoggedIn(false);
                }
            }
            getUserProfile();
        }
    }, [userSession]);

    async function login( email, password ) {
        try{
            const response = await axios.post( `${REACT_APP_API_URL}/api/v1/auth/login`, {
                email,
                password
            } );
            const { accessToken } = response.data.response;
            setUserSession( accessToken );
            localStorage.setItem( 'userSession', accessToken );
            setIsUserLoggedIn( true );
            navigate('/search?q=');
        } catch ( error ){
            return error.response;
        }
    }

    function logout() {
        navigate('/search?q=');
        localStorage.removeItem( 'userSession' );
        localStorage.removeItem( 'userProfile' );
        setUserSession(null);
        setUserProfile(null);
        setIsUserLoggedIn(false);
        console.log('Logged out');
    }

    async function signInWithFirebaseAuth( type ){
        try{
            let credentials;
            if( type === 'google'){
                credentials = await startSignIn(googleAuthProvider);
            }else{
                credentials = await startSignIn(facebookAuthProvider);
            }
            const { idToken: id_token, email } = credentials;
            const response = await axios.post( `${REACT_APP_API_URL}/api/v1/auth`, {
                id_token,
                email,
            });
            const { accessToken } = response.data;
            setUserSession( accessToken );
            localStorage.setItem( 'userSession', accessToken );
            setIsUserLoggedIn( true );
            navigate('/search?q=');
        }catch( error ){
            console.log(error);
        }
    }

    const value = {
        userSession,
        login,
        logout,
        userProfile,
        setUserProfile,
        signInWithFirebaseAuth,
        isUserLoggedIn,
    };
    return <authContext.Provider value={value}> {props.children } </authContext.Provider>
}

export { useAuthorization, AuthProvider };
