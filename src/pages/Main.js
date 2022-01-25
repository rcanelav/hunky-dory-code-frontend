import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { PostTitle } from '../components/postslist/PostTitle';
const { REACT_APP_API_URL } = process.env;

export const Main = () => {
  const [searchParams ] = useSearchParams();
  const [ data, setData ] = useState([]);
  const [ posts, setPosts ] = useState([]);
  const searchValue = searchParams.get('q');
  const [ isLoading, setIsLoading ] = useState(true);
  const [ page, setPage ] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/search?q=${searchValue || ''}&page=${page}`);
      setData( response.data);
      setPosts( prev => (
        [ ...prev, ...response.data.results]
      ))
      setIsLoading(false);
    }
    fetchData();
  }, [ searchValue, page ]);
  if( isLoading ) return <div> is loading </div>
  return (
    <>
      <InfiniteScroll
      dataLength={data.totalResults}
      next={ () => setPage( prev => prev + 1 ) }
      hasMore={ !!data.next}
      >
        <StyledPostsWrapper>
          {
            posts?.map(item => (
              <PostTitle
                key={item.id}
                title={item.title}
                date={item.postedAt}
                author={`${item.userName} ${item.userLastname}`}
                userImage={item.userImage}
                userId={item.postedBy}
                content={item.content}
              />
            ))
          }
        </StyledPostsWrapper>
      </InfiniteScroll>
    </>
  );
};

const StyledPostsWrapper = styled.div`
  margin: 500px auto;
  max-width: 90%;
  min-width: 90%;

  @media (min-width: 768px) {
    max-width: 50%;
    min-width: 50%;
  }
`;
