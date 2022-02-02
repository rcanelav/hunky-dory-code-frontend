import axios  from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { facebookAuthProvider, googleAuthProvider, startSignIn } from '../firebase/firebaseConfig';

const { REACT_APP_API_URL } = process.env;
const authContext = createContext();

function useAuthorization( params ){
    const context = useContext( authContext );
    if( !context ){
        console.log( 'context is not defined' );
        return;
    }
    return context;
}

function AuthProvider( props ){
    const [ userSession, setUserSession ] = useState( localStorage.getItem( 'userSession' ) );
    const [ userProfile, setUserProfile ] = useState( localStorage.getItem( 'userProfile' ) );
    const [ isUserLoggedIn, setIsUserLoggedIn ] = useState( false );
    const navigate = useNavigate();

    useEffect(() => {
        if (userSession?.length > 0 && userSession !== null) {
            async function getUserProfile() {
                try {
                const config = {
                    headers: {
                    Authorization: `Bearer ${userSession}`,
                    },
                };

                const response = await axios.get(
                    `${REACT_APP_API_URL}/api/v1/auth/current`,
                    config
                );

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
            navigate('/');
        } catch ( error ){
            return error.response;
        }
    }

    function logout() {
        localStorage.removeItem( 'userSession' );
        setUserSession(null);
        // sessionStorage.setItem("userSession", null);
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

            console.log(credentials);
            console.log( accessToken);
            setIsUserLoggedIn( true );
            navigate('/');
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
