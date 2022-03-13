import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import hunky from '../../assets/hdc-hunky.png';
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
            <p>{postLikes} { postLikes === 0 ? 'Hunkies 😔' : <img src={hunky} alt='HUNKY'/>}</p>
            <StyledLikeButton >
                <Button variant='contained' color={isLiked ? "warning" : "primary"} disabled={ !isUserLoggedIn } onClick={  handleLike }>
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
    & > button {
        font-size: 0.65em;
    }
`;
const StyledLikes = styled.div`
  flex: 0 1 100%;
  font-size: 1.2em;
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 0.5em auto 0.1em auto;
  padding: 0 1em;
  &  img {
    margin-left: 0.3em;
    width: 15px;
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
        width: 15px;
    }
}
`;
