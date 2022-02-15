import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PostInfoInteractionBar } from '../postInfo/PostInfoInteractionBar';
import { PostAnswersHeader } from './PostAnswersHeader';
const { REACT_APP_API_URL } = process.env;

export const PostAnswers = ({post}) => {
    const [ answers, setAnswers ] = useState([]);
    useEffect(() => {
        async function getData(){
            const response = await axios.get(`${REACT_APP_API_URL}/api/v1/posts/${post.postData.id}/answers`);
            setAnswers(response.data?.data.results);
        }
        getData();
    }, [post.postData.id]);

    return (
        <>
            { answers.map( answer => (
                <StyledAnswerCard key={answer.id}>
                    <PostAnswersHeader date={answer.createdAt} author={answer.postedBy}  />
                    <p>{answer.content}</p>
                    <PostInfoInteractionBar likes={answer.likes} postData={answer} type={'answers'} />
                </StyledAnswerCard>
                ))
            }
        </>
    );
};

const StyledAnswerCard = styled.div`
    min-width: 0px;
    display: flex;
    flex-flow: row wrap;
    flex: 0 0 90%;
    margin: 2em auto;
    border-radius: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    background-color: rgba(255, 255, 255, 1);
    padding: 2em;

`;