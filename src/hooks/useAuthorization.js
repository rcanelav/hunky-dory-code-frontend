import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { facebookAuthProvider, googleAuthProvider, startSignIn } from '../firebase/firebaseConfig';
import { authentication } from '../services/auth/authentication';
import { getCurrentProfile } from '../services/auth/getCurrentProfile';
import { login } from '../services/auth/login';
import { displayModal } from '../utils/helpers/displayModal';
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
                const currentProfile = await getCurrentProfile( userSession );
                    if( !currentProfile?.data?.errors){
                        setUserProfile(currentProfile);
                        setIsUserLoggedIn(true);
                    }
                } catch (error) {
                    localStorage.removeItem( 'userSession' );
                    setUserSession(null);
                    setIsUserLoggedIn(false);
                    displayModal('error', undefined, error.response.data.errors[0].msg, undefined);
                }
            }
            getUserProfile();
        }
    }, [userSession]);

    async function startLogin( email, password ) {
        try{
            const response = await login( email, password );
            const { accessToken } = response.response;
            setUserSession( accessToken );
            localStorage.setItem( 'userSession', accessToken );
            setIsUserLoggedIn( true );

            return navigate('/search?q=');
        }catch(error){
            displayModal('error', undefined, error.response.data.errors[0].msg, undefined);
        }
    }

    function logout() {
        navigate('/search?q=');
        localStorage.removeItem( 'userSession' );
        localStorage.removeItem( 'userProfile' );
        setUserSession(null);
        setUserProfile(null);
        setIsUserLoggedIn(false);
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
            const response = await authentication( id_token, email );
            const { accessToken } = response;
            if( accessToken ){
                setUserSession( accessToken );
                localStorage.setItem( 'userSession', accessToken );
                setIsUserLoggedIn( true );
                return navigate('/search?q=');
            }
        }catch( error ){
            displayModal('error', undefined, error.response.data.errors[0].msg, undefined);
        }
    }

    const value = {
        userSession,
        startLogin,
        logout,
        userProfile,
        setUserProfile,
        signInWithFirebaseAuth,
        isUserLoggedIn,
    };
    return <authContext.Provider value={value}> {props.children } </authContext.Provider>
}

export { useAuthorization, AuthProvider };
