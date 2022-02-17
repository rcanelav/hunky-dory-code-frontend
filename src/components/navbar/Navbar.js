import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { useAuthorization } from '../../hooks/useAuthorization';
import { SearchBar } from '../searchBar/SearchBar';
import { FiLogOut } from 'react-icons/fi';
import hunky from '../../assets/hdc-hunky.png';

export const Navbar = ({ search, setSearch }) => {
    const { isUserLoggedIn, userProfile, logout } = useAuthorization();
    const navigate = useNavigate();

    return (
        <>
            <Nav className="animate__animated animate__fadeIn" isUserLoggedIn={isUserLoggedIn} >
                <ul>
                    <li>
                        <img src={hunky} alt="hunky"  onClick={ () => navigate('/search?q=') } />
                    </li>
                    <li>
                        <SearchBar />
                    </li>
                    <li>
                        {
                            !isUserLoggedIn 
                            ?
                            <>
                                <StyledButton onClick={ () => navigate('/register') } >
                                    Register
                                </StyledButton>
                                <StyledButton onClick={ () => navigate('/login') }>
                                    Login
                                </StyledButton>
                            </>
                            :
                            <div id='profile-card'>
                                <img src={userProfile?.userData.image} onClick={ () => navigate('/profile')} alt='user'  />
                                <p onClick={ () => logout() }>Salir <FiLogOut /></p>
                            </div>
                        }

                    </li>
                </ul>
            </Nav>
        </>
    )
}

const StyledButton = styled(Button)`
    && {
        margin: 1em 0.3em;
        background-color: #fff;
        color: #000;
        padding: 0.5em;
        font-size: 0.5em;
        width: 50px;
        transition: all 0.3s ease-in-out;
        box-shadow: rgba(50, 50, 93, 0.55) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        &:hover {
            box-shadow: rgba(50, 50, 93, 0.45) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        }

        &:first-child {
            background-color: rgba(255, 204, 3, 1);
            &:hover {
                background-color: rgba(255, 204, 3, 1);
            }
        }
        &:last-child {
            border: 1px solid black;
            &:hover {
                border-color: rgba(0, 0, 0 , 1);
                background-color: rgba(0, 163, 152, 0.8);
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
            background-color: ${({ isUserLoggedIn }) => isUserLoggedIn && 'rgba(255, 255, 255, 1);'};
            align-items: center;
            display: none;
        }

        @media (min-width: 768px) {
            & > * {
                display: block;
            }
            & > li:first-child {
                display: flex;
                justify-content: center;
                align-items: center;
                & img {
                    width: 50px;
                    cursor: pointer;
                    transform: rotate(-35deg);
                }
            }
            & > li:nth-child(2) {
                flex: 0 1 70%;
            }
            & > li:nth-child(3) {
                box-shadow: ${({ isUserLoggedIn }) => isUserLoggedIn && 'box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;'}
                border-radius: 10px;
                display: flex;
                align-self: flex-start;
                flex-flow: row wrap;
                justify-content: space-evenly;
                flex: 0 1 10%;

                > div#profile-card {
                    display: flex;
                    flex-flow: row wrap;
                    align-items: self-start;
                    justify-content: center;
                    & img{
                        margin-top: 1em;
                        width: 2.5em;
                        border-radius: 10px;
                        cursor: pointer;
                        transition: transform .3s;
                        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
                        border: 1px solid rgba(0, 0, 0, 0.1);

                        &:hover {
                            transform: scale(1.1);
                        }
                    }
                    & p {
                        text-align: center;
                        flex: 0 1 100%;
                        margin: 2em auto;
                        font-size: 0.8em;
                        color: red;
                        cursor: pointer;
                    }
                }
            }
        }
        @media (min-width: 1024px) {
            & > li:nth-child(3) {
                flex: 0 1 10%;
            }
        }
    }
`;
