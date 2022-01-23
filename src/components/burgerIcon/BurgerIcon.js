import React from 'react';
import styled from 'styled-components';
import { bool, func } from 'prop-types';

export const BurgerIcon = ({open, setOpen}) => {

    return (
        <>
            <StyledBurger open={ open } onClick={ () => setOpen( !open ) }>
                <div />
                <div />
                <div />
            </StyledBurger>
        </>
    )
}

BurgerIcon.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};

const StyledBurger = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: black;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
  }
`;