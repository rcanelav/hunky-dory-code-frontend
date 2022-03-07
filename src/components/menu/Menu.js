import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { bool, func } from 'prop-types';
import { useAuthorization } from '../../hooks/useAuthorization';
import { FiLogOut } from 'react-icons/fi';
import { TextField } from '@mui/material';

export const Menu = ({ open, setOpen, search, setSearch }) => {
    const { isUserLoggedIn, logout } = useAuthorization();
    const navigate = useNavigate();
    const handleLogout = () => {
        setOpen(!open); 
        logout();
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        navigate('/search?q=' + search);
    }

    return (
    <StyledMenu open={ open }>
        <StyledTextfied 
        id="standard-basic"
        label="Quick Search..."
        variant="standard"
        size="medium"
        value={ search }
        onChange={ e => setSearch(e.target.value) }
        onKeyDown={ e => e.key === 'Enter' && handleSubmit(e) }
        />
        <Link to="/" onClick={ () => setOpen(!open) } >
            
        </Link>
        {   isUserLoggedIn &&
            <Link to="/profile" onClick={ () => { setOpen(!open) } } >
                Profile
            </Link>
        }
        <Link to="/newPost" onClick={ () => setOpen(!open) } >
            New Post
        </Link>

        {
            isUserLoggedIn && 
            <Link to="/" onClick={ handleLogout } >
              salir  <StyledLogout />
            </Link>
        }
    </StyledMenu>
    )
}

Menu.propTypes = {
    open: bool.isRequired,
    setOpen: func.isRequired,
};

const StyledTextfied = styled(TextField)`
    width: 60%;
    align-self: center;

    &&  {
        & .MuiInput-input {
            max-width: 92%;
            font-size: 1.25em;
        }
        & #standard-basic-label {
            font-size: 1.4em;
            color: black;
        }
        & .MuiInput-underline {
            color: black;
            
        }
    }
    `;

const StyledLogout = styled(FiLogOut)`
    font-size: 1em;
    padding: 0;
    cursor: pointer;
    color: red;
`;

const StyledMenu = styled.nav`
  display: flex;
  position: absolute;
  z-index: 2;
  width: 100%;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.95);
  height: 100%;
  text-align: left;
  position: absolute;
  top: 0px;
  left: 0;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.4s ease-in-out;
  padding-top: 10em;
  border-radius: 0 45% 0 0;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
  transition: all 0.3s ease-in-out;
  border: 2px solid rgba(0,0,0,0.2);
  a {
    width: max-content;
    font-size: 1.5em;
    text-transform: uppercase;
    padding: 1em 0;
    margin-left: 20%;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: black;
    text-decoration: none;
    transition: color 0.3s linear;

    &:hover {
      color: rgba(255, 204, 3, 1);
    }

  }
  @media (min-width: 768px) {
    width: 30%;
    height: auto;
    font-size: 0.5em;
    }
`;
