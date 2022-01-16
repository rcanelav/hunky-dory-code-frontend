import { Button } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BurgerIcon } from '../burgerIcon/BurgerIcon';
import { Menu } from '../menu/Menu';
import { Search } from './Search';

export const UnloggedLanding = () => {
    const [ open, setOpen ] = useState( false );
    const [ search, setSearch ] = useState( '' );
    return (
        <>
            <StyledHeader>
                <BurgerIcon open={ open } setOpen={ setOpen } />
                <Menu open={ open } setOpen={ setOpen } />
            </StyledHeader>
                <BodyWrapper>
                    <Search search={search} setSearch={setSearch} />
                </BodyWrapper>
            <Link to="/register">
                <StyledLogin variant="contained">Sign Up</StyledLogin>
            </Link>
            <Link to="/login">
                <StyledRegister variant="contained">Sign In</StyledRegister>
            </Link>
        </>
    )
}

const BodyWrapper = styled.div`
    margin: 15vh auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`;
const StyledHeader = styled.div`
    min-width: 100%;
    height: 15vh;
    background-color: gray;
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
