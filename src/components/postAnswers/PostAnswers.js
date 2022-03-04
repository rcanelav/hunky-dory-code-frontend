import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import { PostInfoInteractionBar } from '../postInfo/PostInfoInteractionBar';
import { PostAnswersHeader } from './PostAnswersHeader';
const { REACT_APP_API_URL } = process.env;

export const PostAnswers = ({post}) => {
    const [ answers, setAnswers ] = useState([]);
    const [ data, setData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ page, setPage ] = useState(1);
    const limit = 10;
    useEffect(() => {
        async function getData(){
            const response = await axios.get(`${REACT_APP_API_URL}/api/v1/posts/${post.postData.id}/answers?page=${page}&limit=${limit}`);
            setData(response.data.data);
            setAnswers( prev => [
                ...prev, ...response.data.data.results
            ]);
            setIsLoading(false);
        }
        getData();
    }, [post.postData.id, page]);
    if( isLoading ) return <div> is loading </div>

    return (
        <StyledInfiniteScroll
        dataLength={ page * limit}
        next={ () => setPage( prev => prev + 1 ) }
        hasMore={ !!data.next}
        className="animate__animated animate__fadeIn">
            { answers.map( answer => (
                <StyledAnswerCard key={answer.id}>
                    <PostAnswersHeader date={answer.createdAt} author={answer.postedBy}  />
                    <p dangerouslySetInnerHTML={{__html: answer.content}} />
                    <PostInfoInteractionBar likes={answer.likes} postData={answer} type={'answers'} />
                </StyledAnswerCard>
                ))
            }
        </StyledInfiniteScroll>
    );
};

const StyledInfiniteScroll = styled(InfiniteScroll)`
  flex: 0 1 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: self-start;
`;

const StyledAnswerCard = styled.div`
    flex: 0 1 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin: 0 auto 0.5em auto;
    border-radius: 10px;
    border: 1px solid #e6e6e6;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    background-color: rgba(255, 255, 255, 1);
    padding: 1.5em;

    & >:nth-child(2) {
        justify-self: center;
        flex: 0 1 94%;
    }
`;
