import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import hunky from '../../assets/hdc-hunky.png';
import { useAuthorization } from '../../hooks/useAuthorization';
const { REACT_APP_API_URL } = process.env;

export const PostInfoInteractionBar = ({ likes, postData }) => {
    const { isUserLoggedIn, userSession } = useAuthorization();
    const [ postLikes, setPostLikes ] = useState(likes.totalLikes);

    const handleLike = async() => {
        const response = await axios(
            {
                method: 'POST',
                url: `${REACT_APP_API_URL}/api/v1/posts/${postData.id}/likes`,
                headers: {'Authorization': `Bearer ${userSession}`}
            }
        );
        if( response.data.msg.includes('removed')){
            setPostLikes(postLikes - 1);
        }else{
            setPostLikes(postLikes + 1);
        }
    }

    useEffect(() => {
        setPostLikes( likes.totalLikes );
    }, [likes.totalLikes]);

    return (
    <>
        <StyledLikes>
            <p>{postLikes} {postLikes === 1 ? 'hunky' : 'hunkies'}{ postLikes === 0 ? '😔' : <img src={hunky} alt='HUNKY'/>}</p>
            <StyledLikeButton >
                <Button variant='contained' color='primary' disabled={ !isUserLoggedIn } onClick={  handleLike }>
                    Dar un <img src={hunky} alt='HUNKY'/>
                </Button>
            </StyledLikeButton>
        </StyledLikes>
    </>
  )
};

const StyledLikeButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: right;
    padding: 0.1em;
    & > button > img {
        margin-left: 1em;
    }
`;
const StyledLikes = styled.div`
  flex: 0 1 100%;
  font-size: 1.6em;
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 0.5em auto 0.1em auto;
  &  img {
    margin-left: 0.3em;
    width: 20px;
  }
  & > * {
      flex: 0 1 45%;
  }
  & > :first-child {
    align-self: center;
    position: relative;

    & > img {
        position: absolute;
        top: -0.3em;
        width: 20px;
    }
}
`;
