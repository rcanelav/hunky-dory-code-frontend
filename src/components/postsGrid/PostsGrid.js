import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import { PostTitle } from '../postslist/PostTitle';
const { REACT_APP_API_URL } = process.env;

export const PostsGrid = ({searchData}) => {
  const { search, searchBy, technology, orderBy, from, to, numAnswers, direction } = searchData;
  const [ data, setData ] = useState([]);
  const [ posts, setPosts ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ page, setPage ] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/search?q=${search || ''}&page=${page}&searchBy=${searchBy || 'title'}${technology ? '&technology='+technology : ''}${ orderBy ? '&orderBy='+orderBy : ''}${from ? '&from='+from : ''}${to ? '&to='+to : ''}${numAnswers ? '&numAnswers='+numAnswers : ''}${ direction ? '&direction='+direction : ''}`);

      setData( response.data );
      setPosts( prev => (
        [ ...prev, ...response.data.results]
      ))
      setIsLoading(false);
      
    }
    fetchData();
     
  }, [ search, page, searchBy, technology, orderBy, from, to, numAnswers, direction ]);

  if( isLoading ) return <div> is loading </div>
  return (
    <StyledInfiniteScroll
    dataLength={data.totalResults}
    next={ () => setPage( prev => prev + 1 ) }
    hasMore={ !!data.next}
    className="animate__animated animate__fadeIn"
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
              postId={item.id}
              data={item}
              className="animate__animated animate__fadeIn"
            />
          ))
        }
      </StyledPostsWrapper>
    </StyledInfiniteScroll>
  );
};

const StyledInfiniteScroll = styled(InfiniteScroll)`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: self-start;
`;

const StyledPostsWrapper = styled.div`
  flex: 0 1 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;