import { Button } from '@mui/material';
import React, { useState } from 'react'
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthorization } from '../../hooks/useAuthorization';
import { BurgerIcon } from '../burgerIcon/BurgerIcon';
import { Menu } from '../menu/Menu';
import { Search } from './Search';

export const UnloggedLanding = () => {
    const [ open, setOpen ] = useState( false );
    const [ search, setSearch ] = useState( '' );
    const { logout, isUserLoggedIn } = useAuthorization();

    return (
        <>
            <Menu open={ open } setOpen={ setOpen } />
            <StyledHeader>
                <BurgerIcon open={ open } setOpen={ setOpen } />
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
                    <>
                        <Link to="/register">
                            <StyledLogin variant="contained">Sign Up</StyledLogin>
                        </Link>
                        <Link to="/login">
                            <StyledRegister variant="contained">Sign In</StyledRegister>
                        </Link>
                    </>
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
        background: yellow;
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
    flex-direction: column;
    align-items: center;
    justify-content: center;


`;
const StyledHeader = styled.div`
    min-width: 100%;
    height: 15vh;
    background-color: gray;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row wrap;
    & > *:first-child {
        margin-left: 3em;
    }
    & > * {
        margin: 0 1em;
    }
`;
const StyledLogin = styled(Button)`
    && {
        background-color: yellow;
        position: absolute;
        bottom: 0;
        border: none;
        border-radius: 0;
        color: black;
        margin: 0;
        min-width: 50%;
        min-height: 10%;
        font-size: 1.7em;
        text-transfor: uppercase;
    }
`;

const StyledRegister = styled(Button)`
    && {
        background-color: grey;
        position: absolute;
        bottom: 0;
        border: none;
        border-radius: 0;
        color: black;
        margin: 0;
        min-height: 10%;
        min-width: 50%;
        font-size: 1.7em;
        text-transfor: uppercase;
        left: 50%;
    }
`;
