import { Divider } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
const { REACT_APP_API_URL } = process.env;

export const PostTitle = ({ title, date, author, userImage, userId, content }) => {
    const userName = author.split(' ')[0] + ' ' + author.split(' ')[1].slice(0, 1) + '.';
    const postContent = content.slice(0, 30) + '...';
    const postTitle = title.slice(0, 20) + '...';
    const [ userRating, setUserRating ] = useState();
    
    useEffect(() => {
        async function getUserRating() {
            try{
                const response = await axios.get(`${REACT_APP_API_URL}/api/v1/users/${userId}/rating`);
                setUserRating(response.data.rating);
            }catch( error ){
                console.log(error);
            }
        }
        getUserRating();
    }, [userId]);
  return (
    <StyledWrapper>
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
    </StyledWrapper>
  )
};

const StyledWrapper = styled.div`
max-width: 100%;
min-width: 100%;
min-height: 100px;
max-height: 100px;
background-color: rgba(206, 206, 206, 0.4);
margin: 1.5em 0;
display: flex;
flex-flow: row wrap;
border-radius: 10px;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
padding: 1%;
overflow: hidden;
`;

const StyledPostContent = styled.div`
margin-left: 1.2em;
flex: 0 0 60%;
min-height: 100%;
max-height: 100px;
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
`;

const StyledTitle = styled.p`
    flex: 1 0 70%;
    font-size: 1.3em;
    font-weight: bold;
    margin: 0;
    height: max-content;
    @media (min-width: 768px) {
        font-size: 1.6em;
    }
`;

const StyledUsername = styled.p`
    font-size: 1em;
    font-weight: bold;
    @media (min-width: 768px) {
        font-size: 1.2em;
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
        font-size: 1.2em;
    }
`;

const StyledPostDate = styled.div`
    flex: 0 0 100%;
    font-size: 0.9em;
    align-self: flex-end;
    
`;
