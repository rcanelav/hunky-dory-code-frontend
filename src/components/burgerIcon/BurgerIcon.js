import React from 'react';
import styled from 'styled-components';
import { bool, func } from 'prop-types';
import UseAnimations from 'react-useanimations';
import menu4  from 'react-useanimations/lib/menu4';

export const BurgerIcon = ({open, setOpen}) => {

  return (
    <>
      <StyledBurger 
        animation={menu4} 
        reverse={open}
        onClick={() => {
          setOpen(!open);
        }}
        size={ 50 }
      />
    </>
  )
}

BurgerIcon.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};

const StyledBurger = styled(UseAnimations)`
  cursor: pointer;
  position: absolute;
  top: -1.5em;
  right: 1em;
  z-index: 2;

  @media (min-width: 768px) {
    display: none;
  }
`;