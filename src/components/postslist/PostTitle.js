import { Divider } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const { REACT_APP_API_URL } = process.env;

export const PostTitle = ({ title, date, author, userImage, userId, content, postId }) => {
    const userName = author.split(' ')[0] + ' ' + author.split(' ')[1].slice(0, 1) + '.';
    const postContent = content.slice(0, 30) + '...';
    const postTitle = title.slice(0, 20) + '...';
    const [ userRating, setUserRating ] = useState();
    
    useEffect(() => {
        async function getUserRating() {
            try{
                const response = await axios.get(`${REACT_APP_API_URL}/api/v1/users/${userId}/rating`);
                setUserRating(response?.data.rating);
            }catch( error ){
                console.log(error);
            }
        }
        getUserRating();
    }, [userId]);
  return (
      <StyledWrapper>
            <Link to={`/posts/${postId}`}>
                <StyledProfileCard>
                    <img src={userImage} alt="author" />
                    <StyledUsername>
                        {userName}
                    </StyledUsername>
                    <StyledUserRating>
                        Rating: ({userRating})
                    </StyledUserRating>
                </StyledProfileCard>
                
                <Divider orientation="vertical" variant='middle'  flexItem />
            
                <StyledPostContent>
                    <StyledTitle>{postTitle}</StyledTitle>
                    <StyledPostText>{postContent}</StyledPostText>
                    <Divider variant='middle' />
                    <StyledPostDate>
                        {new Date(date).toDateString("ES-es")}
                    </StyledPostDate>
                </StyledPostContent>
            </Link>
    </StyledWrapper>
  )
};

const StyledWrapper = styled.div`
    background-color: rgba(206, 206, 206, 0.4);
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 1%;

    flex: 0 1 90%;
    display: flex;
    flex-flow: row wrap;
    margin: 1em 0;
    transition: all 0.3s ease-in-out;
    & > * {
        flex: 0 1 100%;
        display: flex;
        flex-flow: row wrap;
        text-decoration: none;
        color: black;

    }

    &:hover {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    }
`;

const StyledPostContent = styled.div`
margin-left: 1.2em;
flex: 0 0 60%;
display: flex;
flex-flow: row wrap;
`;
const StyledProfileCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 25%;
    overflow: hidden;

    & > img {
        border-radius: 10px;
        width: 60%;
        max-width: 55px;
        aligh-self: flex-start;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        margin-bottom: 0.4em;
    }

    @media (min-width: 768px) {
        & > img {
            width: 100%;
            max-width: 40px;
        }
`;

const StyledTitle = styled.p`
    flex: 1 0 70%;
    font-size: 1.3em;
    font-weight: bold;
    margin: 0;
    @media (min-width: 768px) {
        font-size: 1.1em;
    }
`;

const StyledUsername = styled.p`
    font-size: 1em;
    font-weight: bold;
    @media (min-width: 768px) {
        font-size: 1em;
    }
`;

const StyledUserRating = styled.p`
    font-size: 0.8em;
    @media (min-width: 768px) {
        font-size: 1vw;
    }
`;

const StyledPostText = styled.p`
    flex: 0 0 100%;
    font-size: 1.2em;
    margin: 0;
    height: max-content;
    @media (min-width: 768px) {
        font-size: 0.9em;
    }
`;

const StyledPostDate = styled.div`
    flex: 0 0 100%;
    font-size: 0.8em;
    align-self: flex-end;
    color: #828282;
    font-style: italic;
`;
