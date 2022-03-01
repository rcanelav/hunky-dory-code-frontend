import { TextField, Typography, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Formik } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import axios from 'axios';
import { useAuthorization } from '../hooks/useAuthorization';
import logo from '../assets/logo2.png';
const { REACT_APP_API_URL } = process.env;

export const Register = () => {
    const { signInWithFirebaseAuth } = useAuthorization();
    const [ error, setError ] = useState('');
    const handleRegister = async( userData ) => {
        console.log( userData );
        try{
            const response = await axios.post( `${REACT_APP_API_URL}/api/v1/users`, userData )
            console.log(response.data)
        } catch ( err ){
            const { errors } = err.response.data;
            setError(errors[0].msg);
        }
    };
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
                        name: "asd",
                        lastname: "asd",
                        email: "asd@asd.com",
                        password: "Rasdasd1",
                        repeatPassword: "Rasdasd1",
                        role: ""
                    } }
                    validate={ ( values ) => {
                        const errors = {};
                        if( !values.name ){
                            errors.name = "Name is required";
                        }else{
                            if( values.name.length < 3 ){
                                errors.name = "Name must be at least 3 characters";
                            }
                        }
                        if( !values.lastname ){
                            errors.lastname = "Lastname is required";
                        }else{
                            if( values.lastname.length < 3 ){
                                errors.lastname = "Lastname must be at least 3 characters";
                            }
                        }
                        if ( !values.email ) {
                            errors.email = "Email is required";
                        }else{
                            if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test( values.email ) ){
                                errors.email = "Invalid email address";
                            }
                        }
                        if ( !values.password ) {
                            errors.password = "Password is required!";
                        }else{
                            if( values.password.length < 6 ){
                                errors.password = "Password must be at least 6 characters";
                            }else if ( !/[A-Z]/.test( values.password ) ){
                                errors.password = "Password must contain at least one capital letter";
                            }else if ( !/[\d]/.test( values.password ) ){
                                errors.password = "Password must contain at least one number";
                            }
                        }
                        if( !values.repeatPassword ){
                            errors.repeatPassword = "Repeat password is required";
                        }
                        if ( values.repeatPassword !== values.password ) {
                            errors.repeatPassword = "passwords don't match!";
                        }
                        if( !values.role ){
                            errors.role = "Role is required";
                            setError( "Role is required" );
                        }
                        return errors;
                    } }
                    onSubmit={ values => handleRegister( values ) }
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
                                id="name"
                                name="name"
                                label="Name"
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                error={errors.name && touched.name}
                                helperText={touched.name && errors.name}
                                fullWidth
                            />
                            <StyledField
                                id="lastname"
                                name="lastname"
                                label="Lastname"
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastname}
                                error={errors.lastname && touched.lastname}
                                helperText={touched.lastname && errors.lastname}
                                fullWidth
                            />
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
                            <StyledField
                                id="repeatPassword"
                                name="repeatPassword"
                                type="password"
                                label="Repeat assword"
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.repeatPassword}
                                error={errors.repeatPassword && touched.repeatPassword}
                                helperText={touched.repeatPassword && errors.repeatPassword}
                                fullWidth
                            />
                            <StyledFieldWrapper>
                                    <RadioGroup
                                        defaultValue="STUDENT"
                                        name="role"
                                        onChange={handleChange}
                                        value={values.role}
                                        row
                                        onClick={() => setError('')}

                                    >
                                        <FormControlLabel value="STUDENT" control={<Radio />} label="Student" />
                                        <FormControlLabel value="EXPERT" control={<Radio />} label="Expert" />

                                    </RadioGroup>
                            </StyledFieldWrapper>
                            {
                                error && <StyledErrorMessage severity='error'> {error} </StyledErrorMessage>
                            }
                            <StyledButton type="submit" variant="contained" >
                                Register
                            </StyledButton>
                            <span> OR </span>
                            <StyledSocialWrapper>
                                <StyledGoogleButton onClick={  handleAuth } />
                                <StyledFacebookButton onClick={  handleAuth } />
                            </StyledSocialWrapper>
                        </form>
                    )}
                </Formik>
        </StyledWrapper>
    )
}

const StyledFieldWrapper = styled.div`
    max-width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
`;

const StyledWrapper = styled.div`
    border-radius: 10px;
    box-shadow: 4px -4px 13px 1px rgba(0,0,0, 0.2),
                -2px 3px 19px 1px rgba(0,0,0, 0.2);
    border: 1px solid rgba(0,0,0, 0.2);
    padding: 1em;
    display: flex;
    min-width: 80%;
    max-width: 80%;
    margin: 10vh auto;
    flex-flow: column wrap;
    & form {
        margin-top: 2vh;

        text-align: center;
        & >span {
            display: block;
            font-size: 1.5em;
            margin: 2vh auto;
        }
    }

    @media (min-width: 768px) {
        min-width: 30%;
        max-width: 30%;
        background-color: rgba(255,255,255,0.85);
        padding: 4em;
        &:before {
            background-image: url(${logo});
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            content: "";
            display: block;
            height: 90%;
            left: 27%;
            position: absolute;
            top: 0;
            width: 50%;
            z-index: -1;
            overflow: hidden;

        }
    }
`;
const StyledSocialWrapper = styled.div`
    flex: 0 1 100%;
    margin: 1vh auto;
}
`;

const StyledErrorMessage = styled.div`
    && {
        max-width: 100%;
        min-width: 100%;
        background-color: rgba(255, 30, 0, 0.79);
        margin: 1vh auto;
        font-size: 1.15em;
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
            margin-left: 0 !important;
        }
    `;
}

const StyledGoogleButton = styledButton(GoogleLoginButton);
const StyledFacebookButton = styledButton(FacebookLoginButton);

const StyledField = styled(TextField)`

    && {
        min-width: 80%;
        font-size: 5em;
        margin: 1vh auto;
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

