import { Button } from '@mui/material';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthorization } from '../../hooks/useAuthorization';
import { BurgerIcon } from '../burgerIcon/BurgerIcon';
import { Menu } from '../menu/Menu';
import { Search } from './Search';
import logo from '../../assets/hunky.png';
export const UnloggedLanding = () => {
    const navigate = useNavigate();
    const [ open, setOpen ] = useState( false );
    const [ search, setSearch ] = useState( '' );
    const { isUserLoggedIn, userProfile, logout } = useAuthorization();
    
    return (
        <>
            <Menu open={ open } setOpen={ setOpen } search={search} setSearch={setSearch} />
            <StyledHeader className="animate__animated animate__fadeIn">
                <div />
                <div className='logo'>
                    <img src={ logo } alt="logo" />
                </div>
                <div id='burger'>
                    {
                        !isUserLoggedIn ?
                        <div id='auth-buttons'>
                            <StyledLogin variant="contained" 
                                onClick={ () => navigate('/register')}>
                                    Sign Up
                            </StyledLogin>
                            <StyledRegister variant="contained"
                                onClick={ () => navigate('/login')}>
                                Sign In
                            </StyledRegister>
                        </div>
                        :
                        <div id='profile-logout'>
                            <img src={userProfile?.userData?.image} onClick={ () => navigate('/profile')} alt='hunky dory user'  />
                            <div id='logout-container'>
                                <Button color='error' variant='contained' onClick={ () => logout() }>Logout</Button>
                            </div>
                        </div>

                    }
                    <BurgerIcon open={ open } setOpen={ setOpen } />
                </div>
            </StyledHeader>
                <BodyWrapper className="animate__animated animate__fadeIn">
                    <Search search={search} setSearch={setSearch} />
                </BodyWrapper>

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
    display: flex;
    flex-flow: row wrap;
    align-items: center;

    & > * {
        flex: 0 1 33%;
    }
    & > .logo {
        margin: 2em auto 0 1em;
        flex: 0 1 33%;
        & > img {
            width: 100%;
            max-width: 140px;
        }
    }
    & > #burger {
        position:relative;

        flex: 0 1 12%;
        & > button {
            display: none;
        }
        & > #auth-buttons {
            display: none;
        }
        & > #profile-logout {
            display: none;
            margin: 5em 10% 0 0;
            flex-flow: row wrap;
            align-items: center;
            justify-content: center;
            & img {
                flex: 0 1 100%;
                width: 2.5em;
                min-width: 50px;
                max-width: 50px;
                border-radius: 10px;
                cursor: pointer;
                transition: transform .3s;
                box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
                border: 1px solid rgba(0, 0, 0, 0.1);

                &:hover {
                    transform: scale(1.05);
                }
            }
            & > #logout-container {
                margin-top: 0.5em;
                flex: 0 1 100%;
                display: flex;
                flex-flow: row wrap;
                justify-content: center;
                align-items: center;
                &  button {
                    padding: 0.3em 0.5em;
                    font-size: 1.8em;
                }
            }
        }                
    }

    @media (min-width: 648px) {
        & > .logo {
            margin: 1em 2.5em 0 2em;
        }
    }

    @media (min-width: 768px) {
        justify-content: space-between;
        & > * {
            flex: 0 1 33%;
        }
        & > .logo {
            margin: 1em 0em 0 0;
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            justify-content: center;
            & > img {
                width: 40%;
            }
        }
        & > #burger {
            flex: 0 1 33%;
            font-size: 0.3em;
            display: flex;
            flex-direction: row wrap;
            justify-content: right;
            & > button {
                display: block;
                flex: 0 1 25%;
            }
            & > #profile-logout {
                display: flex;
            }
            & > #auth-buttons {
                display: flex;
                flex: 0 1 100%;
                flex-flow: row wrap;
                justify-content: right;
                align-items: center;
                & > * {
                    margin-right: 2em;
                    &:last-child {
                        margin-right: 20%;
                    }
                }
            }
        }
    }
    @media (min-width: 1024px) {
        & > .logo {
            margin: 1em 0em 0 0;
        }
        & > #burger {
            font-size: 0.4em;
        }
    }
`;

const StyledAuthContainer = styled.div`
    margin: 10em auto 5em auto;
    min-width: 100%;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-items: center;

    & > * {
        flex: 0 1 40%;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        align-items: center;
        max-width: max-content;
        text-decoration: none;
        font-size: 0.8em;
    }

    @media (min-width: 768px) {
        display: none;
    }
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
