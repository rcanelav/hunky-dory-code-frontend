import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuthorization } from '../../hooks/useAuthorization';
import { setLikeToPublication } from '../../services/posts/setLikeToPublication';

export const PostInfoInteractionBar = ({ likes, postData, type = 'posts' }) => {
    const { userProfile } = useAuthorization();
    const { isUserLoggedIn, userSession } = useAuthorization();
    const [ postLikes, setPostLikes ] = useState(likes.totalLikes);
    const [ isLiked, setIsLiked ] = useState(false);

    const handleLike = async() => {
        const like = await setLikeToPublication(type, postData.id, userSession);
        if( like.msg.includes('removed')){
            setPostLikes(postLikes - 1);
        }else{
            setPostLikes(postLikes + 1);
        }
        setIsLiked(!isLiked);
    }

    useEffect(() => {
        setPostLikes( likes.totalLikes );
        likes?.answerLikes?.forEach( like => {
            if( userProfile && like.user_id === userProfile?.userData?.id ){
                setIsLiked( prev => !prev);
            }
        });

    }, [ likes.totalLikes, likes.answerLikes, userProfile ]);

    return (
    <>
        <StyledLikes>
            <p>⚡: {postLikes} {postLikes !== 1 ? 'hunkies' : 'hunky'} { postLikes === 0 && '😔'} </p>
            <StyledLikeButton isLiked={isLiked} isDisabled={!isUserLoggedIn}>
                <Button variant='contained'  disabled={ !isUserLoggedIn } onClick={  handleLike }>
                    Give a ⚡
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
    & > button {
        border: 2px solid rgb(255, 2, 90);
        border: 2px solid ${({ isDisabled }) => isDisabled ? 'transparent' : 'rgb(255, 2, 90)'};
        color: ${({ isLiked }) => !isLiked ? 'black' :'white' };
        background-color: ${({ isLiked }) => !isLiked ? 'rgb(255, 255, 255)' :'rgb(255, 2, 90)' };
    }
    & > button {
        font-size: 0.65em;
        transition: all 0.3s ease-in-out;
        &:hover {
            background-color: ${({ isLiked }) => !isLiked ? 'rgb(255, 2, 90)' :'2px solid rgb(255, 255, 255)' };
            color: ${({ isLiked }) => !isLiked ? 'white': 'black' };
        }
    }
`;
const StyledLikes = styled.div`
  flex: 0 1 100%;
  font-size: 0.9em;
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 0.5em auto 0.1em auto;
  padding: 0 1em;
  &  img {
    width: 12px;
  }
  & > * {
      flex: 0 1 45%;
  }
  & > :first-child {
    flex: 0 1 51%;
    align-self: center;
    position: relative;
}
`;
