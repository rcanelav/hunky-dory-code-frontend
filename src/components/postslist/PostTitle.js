import { Divider } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const { REACT_APP_API_URL } = process.env;

export const PostTitle = ({ title, date, author, userImage, userId, content, postId, data }) => {
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
    console.log(data);
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
                    <StyledRelatedData>
                        <div>
                            {new Date(date).toDateString("ES-es")}
                        </div>
                        <div id='info'>
                            <p>⚡:{data.likes} 👀:{data.views} 📢:{data.numAnswers}</p>
                        </div>

                    </StyledRelatedData>
                </StyledPostContent>
            </Link>
    </StyledWrapper>
  )
};

const StyledWrapper = styled.div`
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 2% 1% 1.5% 1%;
    flex: 0 1 90%;
    display: flex;
    flex-flow: row wrap;
    margin: 0.3em 0;
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
    flex: 0 1 70%;
    display: flex;
    flex-flow: row wrap;

`;
const StyledProfileCard = styled.div`
    flex: 0 1 20%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    & > * {
        flex: 0 1 100%;
        text-align: center;
    }

    & > img {
        border-radius: 10px;
        width: 60%;
        max-width: 60%;
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
    flex: 0 1 70%;
    font-size: 5vw;
    font-weight: bold;
    margin: 0;
    @media (min-width: 768px) {
        font-size: 1.1em;
    }
`;

const StyledUsername = styled.p`
    font-size: 2.5vw;
    font-weight: bold;
    @media (min-width: 768px) {
        font-size: 1em;
    }
`;

const StyledUserRating = styled.p`
    font-size: 0.8em;
    @media (min-width: 768px) {
        font-size: 0.8em;
    }
`;

const StyledPostText = styled.p`
    flex: 0 1 100%;
    font-size: 4vw;
    height: max-content;
    @media (min-width: 768px) {
        font-size: 0.9em;
    }
`;

const StyledRelatedData = styled.div`
    flex: 0 0 100%;
    font-size: 0.8em;
    align-self: flex-end;
    color: #828282;
    font-style: italic;

    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;

    & > * {
        flex: 0 1 50%;
    }

    & > div#info {
        text-align: right;
    }
`;
