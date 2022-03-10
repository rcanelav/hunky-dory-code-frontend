import { TextField, Typography, Button } from '@mui/material';
import { Formik } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { useAuthorization } from '../hooks/useAuthorization';
import { Navbar } from '../components/navbar/Navbar';

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
        <ContentWrapper className="animate__animated animate__fadeIn">
            <StyledNavbar />
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
        </ContentWrapper>
    )
}

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  max-width: 1620px;
  margin: 0 auto;
  position: relative;
`;

const StyledWrapper = styled.div`
    border-radius: 10px;
    background-color: rgba(255,255,255,0.85);
    box-shadow: 4px -4px 13px 1px rgba(0,0,0, 0.2),
                -2px 3px 19px 1px rgba(0,0,0, 0.2);
    border: 1px solid rgba(0,0,0, 0.2);
    padding: 3em 1em 1em 1em;
    display: flex;
    min-width: 70%;
    max-width: 85%;
    margin: 3vh auto;
    flex-flow: column wrap;

    & form {
        margin-top: 5vh;
        text-align: center;
        & >span {
            display: block;
            font-size: 2em;
            margin: 2vh auto;
        }
    }
    transition: all 0.3s ease-in-out;

    @media (min-width: 648px) {
        min-width: 50%;
        max-width: 50%;
        margin: 5% auto 0 auto;

        & >:first-child {
            margin-top: 1em;
        }
        & form {
            padding: 1em;
            & span {
                font-size: 1.1em;
            }
        }
    }

    @media (min-width: 768px) {
        min-width: 48.5%;
        max-width: 48.5%;
        padding: 1em;
        margin: 5% auto 0 auto;
        & form {
            padding: 1em;
            & span {
                font-size: 1.1em;
            }
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
        margin-top: 2vh;
        min-width: 100%;
        margin-bottom: 1vh;
        font-size: 1.1em;
    }
`;

const StyledNavbar = styled(Navbar)`
  flex: 0 1 100%;
`;
