import React from 'react'
import styled from 'styled-components';
import UseAnimations from 'react-useanimations'
import loading2 from 'react-useanimations/lib/loading2'

export const Loading = () => {
  return (
    <LoadingWrapper>
        <UseAnimations
            size={100}
            animation={loading2}
            fillColor='rgba(255, 204, 3, 1)'
        />
    </LoadingWrapper>
  )
}

const LoadingWrapper = styled.div`
  & > * {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
