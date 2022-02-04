import { Button } from '@mui/material';
import React, { useState } from 'react'
import { FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthorization } from '../../hooks/useAuthorization';
import { BurgerIcon } from '../burgerIcon/BurgerIcon';
import { Menu } from '../menu/Menu';
import { Search } from './Search';
import logo from '../../assets/logo.png';
export const UnloggedLanding = () => {
    const navigate = useNavigate();
    const [ open, setOpen ] = useState( false );
    const [ search, setSearch ] = useState( '' );
    const { logout, isUserLoggedIn } = useAuthorization();
    
    return (
        <>
            <Menu open={ open } setOpen={ setOpen } search={search} setSearch={setSearch} />
            <StyledHeader>
                <div />
                <div className='logo'>
                    <img src={ logo } alt="logo" />
                </div>
                <div id='burger'>
                    {
                        !isUserLoggedIn &&
                        <>
                            <StyledLogin variant="contained" 
                                onClick={ () => navigate('/register')}>
                                    Sign Up
                            </StyledLogin>
                            <StyledRegister variant="contained"
                                onClick={ () => navigate('/login')}>
                                Sign In
                            </StyledRegister>
                        </>
                    }
                    <BurgerIcon open={ open } setOpen={ setOpen } />
                </div>
                {
                        isUserLoggedIn && <StyledLogout onClick={ logout }/>
                }
                

            </StyledHeader>
                <BodyWrapper>
                    <Search search={search} setSearch={setSearch} />
                </BodyWrapper>
            <StyledText>
                <p> Don't let the code </p>
                <p> knock you out </p>
            </StyledText>

            {
                !isUserLoggedIn && (
                    <StyledAuthContainer>
                        <Link to="/register">
                            <StyledLogin variant="contained">Sign Up</StyledLogin>
                        </Link>
                        <Link to="/login">
                            <StyledRegister variant="contained">Sign In</StyledRegister>
                        </Link>
                    </StyledAuthContainer>
                )
            }
        </>
    )
}
const StyledText = styled.div`
    max-width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > p {
        width: max-content;
        font-size: 1.5rem;
        font-weight: bold;
        background: rgba(255, 204, 3, 1);
        font-size: 2.2em;
    }
    & > p:first-child {
        margin-left: -1em;
    }
    & > p:not(:first-child) {
        margin: 0.4em 0 0 2em;
    }
`;
const StyledLogout = styled(FiLogOut)`
    font-size: 2em;
    padding: 0;
    cursor: pointer;
    color: red;
`;

const BodyWrapper = styled.div`
    margin: 19vh auto;
    display: flex;
    flex-direction: row wrap;
    align-items: center;
    justify-content: center;

`;
const StyledHeader = styled.div`
    min-width: 100%;
    max-width: 100%;
    background-color: rgba(255, 204, 3, 1);
    display: flex;
    flex-flow: row wrap;
    align-items: center;

    & > * {
        flex: 0 1 33%;
    }
    & > .logo {
        margin: 0 auto 0 1.5em;
        flex: 0 1 30%;
        & > img {
            width: 80%;
        }
    }
    & > #burger {
        position:relative;

        flex: 0 1 12%;
        & > button {
            display: none;
        }
    }

    @media (min-width: 768px) {
        justify-content: space-between;
        & > * {
            flex: 0 1 33%;
        }
        & > .logo {
            margin: 0 -6em 0 0;
            & > img {
                width: 30%;
            }
        }
        & > #burger {
            margin-right: 5em;
            flex: 0 1 20%;
            font-size: 0.3em;
            display: flex;
            flex-direction: row wrap;
            justify-content: space-evenly;
            & > button {
                display: block;
                flex: 0 1 45%;
            }
            & > * {
                flex: 0 1 35%;
            }
        }
    }
    @media (min-width: 1024px) {
        & > #burger {
            font-size: 0.4em;
            & > button {
                flex: 0 1 35%;
            }
        }
    }
`;

const StyledAuthContainer = styled.div`
    margin: 0 auto 10em auto;
    min-width: 100%;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-items: center;

    & > * {
        flex: 0 1 50%;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        max-width: max-content;
        text-decoration: none;
    }

    @media (min-width: 678px) {
        font-size: 0.5em;
        display: none;
       

`;
const StyledLogin = styled(Button)`
    && {
        background-color: rgba(255, 204, 3, 1);
        border: none;
        color: black;
        min-height: 10%;
        font-size: 1.7em;
        text-transfor: uppercase;

        &&:hover{
            background-color: rgba(255, 230, 0, 1);
        }
    }
`;

const StyledRegister = styled(Button)`
    && {
        background-color: lightgray;
        border: none;
        color: black;
        min-height: 10%;
        font-size: 1.7em;
        text-transfor: uppercase;
        &&:hover {
            background-color: rgba(0, 163, 152, 1);
        }
    }
`;
