import axios  from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

    const [ userProfile, setUserProfile ] = useState({});

    const navigate = useNavigate();

    async function login( email, password ) {

        try{
            const response = await axios.post( `${REACT_APP_API_URL}/api/v1/auth/login`, {
                email,
                password
            } );
            const { accessToken } = response.data.response;
            setUserSession( accessToken );
            localStorage.setItem( 'userSession', accessToken );
            navigate('/');
        } catch ( error ){
            return error.response;
        }
    }

    function logout() {
        setUserSession(null);
        sessionStorage.setItem("userSession", null);
    }

    // useEffect(() => {
    //     if (userSession) {
    //       async function getUserProfile(params) {
    //         try {
    //           const config = {
    //             headers: {
    //               Authorization: `Bearer ${userSession}`,
    //             },
    //           };

    //           const response = await axios.get(
    //             "http://localhost/api/auth/users/current",
    //             config
    //           );

    //           setUserProfile(response.data.user);
    //         } catch (error) {
    //           console.log("ERROR: ", error);
    //         }
    //       }
    //       getUserProfile();
    //     }
    //   }, [userSession]);

    const value = {
        userSession,
        login,
        logout,
        userProfile,
        setUserProfile,
    };

    return <authContext.Provider value={value}> {props.children } </authContext.Provider>
}

export { useAuthorization, AuthProvider };