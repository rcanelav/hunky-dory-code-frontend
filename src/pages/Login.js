import { TextField, Typography, Button } from '@mui/material';
import { Formik } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { useAuthorization } from '../hooks/useAuthorization';

export const Login = () => {
    const { login, signInWithFirebaseAuth } = useAuthorization();
    const [ error, setError ] = useState('');
    const handleAuth = async (e) => {
        e.preventDefault();
        if(e.target.textContent.includes('Google')){
            return signInWithFirebaseAuth('google');
        }
        return signInWithFirebaseAuth('facebook');
    }

    return (
        <StyledWrapper>
            <Typography
                textAlign={"center"}
                variant="h4"
                gutterBottom
                component="h2"
                >
                Login
                </Typography>
                <Formik
                    initialValues = { {
                        email: "",
                        password: "",
                    } }
                    validate={ ( values ) => {
                        const errors = {};

                        if ( !values.email ) {
                            errors.email = "email required!";
                        }

                        if ( !values.password ) {
                            errors.password = "password required!";
                        }
                        return errors;
                    } }
                    onSubmit={ async ( values ) => {
                        const respData = await login( values.email, values.password );
                        if( respData ){
                            const err = respData.data.errors;
                            setError( err[0].msg );
                        }
                    } }
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <StyledField
                                id="email"
                                name="email"
                                type="email"
                                label="Email"
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                error={errors.email && touched.email}
                                helperText={touched.email && errors.email}
                                fullWidth
                            />

                            <StyledField
                                id="password"
                                name="password"
                                type="password"
                                label="Password"
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                error={errors.password && touched.password}
                                helperText={touched.password && errors.password}
                                fullWidth
                            />

                            {
                                error && <StyledErrorMessage severity='error'> {error} </StyledErrorMessage>
                            }

                            <StyledButton type="submit" variant="contained">
                                Login
                            </StyledButton>
                            <span> OR </span>
                            <StyledSocialWrapper>
                                <StyledGoogleButton onClick={  handleAuth } />
                            </StyledSocialWrapper>
                            <StyledSocialWrapper>
                                <StyledFacebookButton onClick={ handleAuth } />
                            </StyledSocialWrapper>
                        </form>
                    )}
                </Formik>
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
    display: flex;
    min-width: 81%;
    max-width: 81%;
    margin: 10vh auto;
    flex-flow: column wrap;
    & form {
        margin-top: 15vh;
        text-align: center;
        & >span {
            display: block;
            font-size: 1.5em;
            margin: 2vh auto;
        }
    }
`;
const StyledSocialWrapper = styled.div`
    margin: 1vh auto;
}
`;

const StyledErrorMessage = styled.div`
    && {
        max-width: 100%;
        min-width: 100%;
        background-color: rgba(255, 30, 0, 0.59);
        margin: 1vh auto;
        font-size: 1.3em;
        border: 1px solid red;
        border-radius: 5px;
        flex: 1 1 auto;
    }
`;
const styledButton = ( button ) => {
    return styled(button)`
        && {
            min-width: 100%;
            max-width: 100%;

        }
    `;
}

const StyledGoogleButton = styledButton(GoogleLoginButton);
const StyledFacebookButton = styledButton(FacebookLoginButton);

const StyledField = styled(TextField)`

    && {
        min-width: 80%;
        font-size: 5em;

        &:first-child {
            margin-bottom: 5vh;
        }
    }
`;

const StyledButton = styled(Button)`
    && {
        margin-top: 1vh;
        min-width: 100%;
        margin-bottom: 2vh;
        font-size: 1.1em;
    }
`;

