import { TextField, Typography, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { useAuthorization } from '../hooks/useAuthorization';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/navbar/Navbar';
import { registerUser } from '../services/users/registerUser';
import { displayModal } from '../utils/helpers/displayModal';

export const Register = () => {
    const { signInWithFirebaseAuth } = useAuthorization();
    const navigate = useNavigate();
    const handleRegister = async( userData ) => {
        try{
            const {msg} = await registerUser( userData );
            displayModal('success', msg, 'We have sent you an email to activate your account', undefined)
            .then( result => navigate('/') );
        } catch ( error ){
            displayModal(undefined, undefined, error.response.data.errors[0].msg , undefined);
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
        <ContentWrapper className="animate__animated animate__fadeIn">
            <StyledNavbar />
            <StyledWrapper className='animate__animated animate__fadeIn'>
                <Typography
                    textAlign={"center"}
                    variant="h4"
                    gutterBottom
                    component="h2"
                    >
                    Register
                </Typography>
                    <Formik
                        initialValues = { {
                            name: "",
                            lastname: "",
                            email: "",
                            password: "",
                            repeatPassword: "",
                            role: "STUDENT"
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
                                    size="small"
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
                                    size="small"
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
                                    >
                                        <FormControlLabel value="STUDENT" control={<Radio />} label="Student" />
                                        <FormControlLabel value="EXPERT" control={<Radio />} label="Expert" />
                                    </RadioGroup>
                                </StyledFieldWrapper>
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

const StyledFieldWrapper = styled.div`
    max-width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
`;

const StyledWrapper = styled.div`
    background-color: rgba(255,255,255,0.9);
    border-radius: 10px;
    box-shadow: 4px -4px 13px 1px rgba(0,0,0, 0.2),
                -2px 3px 19px 1px rgba(0,0,0, 0.2);
    border: 1px solid rgba(0,0,0, 0.2);
    padding: 1em;
    display: flex;
    min-width: 80%;
    max-width: 80%;
    margin: 2vh auto;
    flex-flow: column wrap;
    transition: all 0.3s ease-in-out;
    & form {
        margin-top: 0.8em;

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
        padding: 2.5em 4em;
        margin: 10vh auto;
    }
`;
const StyledSocialWrapper = styled.div`
    flex: 0 1 100%;
    margin: 1vh auto;
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

const StyledNavbar = styled(Navbar)`
  flex: 0 1 100%;
`;
