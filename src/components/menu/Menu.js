import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { bool, func } from 'prop-types';

export const Menu = ({ open, setOpen }) => {
    return (
    <StyledMenu open={ open }>
        <Link to="/" onClick={ () => setOpen(!open) } >
            INFO
        </Link>
        <Link to="/" onClick={ () => setOpen(!open) } >
            INFO
        </Link>
        <Link to="/" onClick={ () => setOpen(!open) } >
            INFO
        </Link>
    </StyledMenu>
    )
}

Menu.propTypes = {
    open: bool.isRequired,
    setOpen: func.isRequired,
};

const StyledMenu = styled.nav`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  background: white;
  height: 100%;
  text-align: left;
  position: absolute;
  top: 0px;
  left: 0;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease-in-out;

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    margin-left: 20%;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: black;
    text-decoration: none;
    transition: color 0.3s linear;

    &:first-child {
        margin-top: -2em;
    }

    &:hover {
      color: violet;
    }

  }
`;
