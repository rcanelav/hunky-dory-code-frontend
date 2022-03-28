import { Button } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { useAuthorization } from '../../hooks/useAuthorization';
import { SearchBar } from '../searchBar/SearchBar';
import hunky from '../../assets/hunky.png';
import { Menu } from '../menu/Menu';

export const Navbar = ({ search, setSearch }) => {
    const { isUserLoggedIn, userProfile, logout } = useAuthorization();
    const [ open, setOpen ] = useState( false );
    const [ textSearch, setTextSearch ] = useState( '' );
    const navigate = useNavigate();

    return (
        <>
            <Nav className="animate__animated animate__fadeIn" isUserLoggedIn={isUserLoggedIn} >
                <ul>
                    <li>
                        <img src={hunky} alt="hunky"  onClick={ () => navigate('/search?q=') } />
                    </li>
                    <li>
                        <SearchBar openMenu={open} setOpenMenu={setOpen} />
                    </li>
                    <li>
                        {
                            !isUserLoggedIn 
                            ?
                            <div id='auth-container'>
                                <StyledButton onClick={ () => navigate('/register') } >
                                    Register
                                </StyledButton>
                                <StyledButton onClick={ () => navigate('/login') }>
                                    Login
                                </StyledButton>
                            </div>
                            :
                            <div id='profile-card'>
                                <img src={userProfile?.userData.image} onClick={ () => navigate('/profile')} alt='hunky dory user'  />
                                <div id='logout-container'>
                                    <Button color='error' variant='contained' onClick={ () => logout() }>Salir</Button>
                                </div>
                            </div>
                        }

                    </li>
                </ul>
            </Nav>
            <Menu open={open} setOpen={setOpen} search={textSearch} setSearch={setTextSearch} />
        </>
    )
}

const StyledButton = styled(Button)`
    && {
        margin: 1em 0.3em;
        background-color: #fff;
        color: #000;
        padding: 0.5em 1em;
        font-size: 0.5em;
        transition: all 0.3s ease-in-out;
        box-shadow: rgba(50, 50, 93, 0.55) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        &:hover {
            box-shadow: rgba(50, 50, 93, 0.45) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        }

        &:first-child {
            background-color: rgba(255, 204, 3, 1);
            &:hover {
                background-color: rgba(255, 175, 57, 1);
            }
        }
        &:last-child {
            border: 1px solid black;
            &:hover {
                border-color: rgba(0, 0, 0 , 1);
                background-color: rgba(0, 185, 165, 1);
                color: rgba(255, 255, 255, 1);
            }
        }
    }
`;
const Nav = styled.nav`
    flex: 0 1 100%;
    padding: 0;
    & ul {
        list-style-type: none;
        font-size: 1.2em;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
        & > * {
            flex: 0 1 10%;
            display: none;
        }
        & li:nth-child(2) {
            flex: 0 1 92%;
            display: block;
        }
        & li:nth-child(3) {
            margin-top: 0.8em;
            flex: 0 1 10%;
            align-items: center;
            display: none;
        }

        @media (min-width: 768px) {
            & > * {
                display: block;
            }
            & > li:first-child {
                flex: 0 1 15%;
                display: flex;
                justify-content: center;
                align-items: center;
                & img {
                    margin-top: 0.5em;
                    width: 100%;
                    cursor: pointer;
                    max-width: 160px;
                }
            }
            & > li:nth-child(2) {
                flex: 0 1 52%;
            }
            & > li:nth-child(3) {
                box-shadow: ${({ isUserLoggedIn }) => isUserLoggedIn && 'box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;'}
                border-radius: 10px;
                display: flex;
                align-self: flex-start;
                flex-flow: row wrap;
                justify-content: space-evenly;
                flex: 0 1 15%;

                & > #auth-container {
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: space-evenly;
                    flex: 0 1 100%;
                    & > * {
                        flex: 0 1 35%;
                    }
                }
                & > div#profile-card {
                    display: flex;
                    flex-flow: row wrap;
                    align-items: self-start;
                    justify-content: space-evenly;
                    & img {
                        flex: 0 1 45%;
                        width: 2.5em;
                        min-width: 100px;
                        max-width: 100px;
                        border-radius: 10px;
                        cursor: pointer;
                        transition: transform .3s;
                        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
                        border: 1px solid rgba(0, 0, 0, 0.1);

                        &:hover {
                            transform: scale(1.1);
                        }
                    }
                    & > #logout-container {
                        flex: 0 1 100%;
                        display: flex;
                        flex-flow: row wrap;
                        justify-content: center;
                        align-items: center;
                        & >  button {
                            min-width: 80px;
                            max-width: 80px;
                            margin: 1em auto;
                            padding: 0.3em 2.8em;
                            max-width: 200px;
                            text-align: center;
                            font-size: 0.6em;
                            color: white;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
        @media (min-width: 1024px) {
            & > li:nth-child(3) {
                & > * {
                    flex: 0 1 20%;
                }

                & > div#profile-card {
                    flex: 0 1 100%;
                    & > * {
                        flex: 0 1 35%;
                    }
                }
            }
        }
    }
`;
