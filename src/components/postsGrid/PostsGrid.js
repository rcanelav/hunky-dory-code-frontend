import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import { PostTitle } from '../postslist/PostTitle';
import { Loading } from '../loading/Loading';
import { searchPublication } from '../../services/posts/searchPublication';

export const PostsGrid = ({searchData}) => {
  const { search, searchBy, technology, orderBy, from, to, numAnswers, direction } = searchData;
  const [ data, setData ] = useState([]);
  const [ posts, setPosts ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ page, setPage ] = useState(1);
  const limit = 10;

  useEffect(() => {
    async function getData() {
      const url = `search?q=${search || ''}&page=${page}&searchBy=${searchBy || 'title'}${technology ? '&technology='+technology : ''}${ orderBy ? '&order='+orderBy : ''}${from ? '&from='+from : ''}${to ? '&to='+to : ''}${numAnswers ? '&numAnswers='+numAnswers : ''}${ direction ? '&direction='+direction : ''}&limit=${limit}`;

      const publications = (await searchPublication( url ) );
      setData( publications );
      setPosts( prev => (
        [ ...prev, ...publications.results]
      ))
      setIsLoading(false);
      
    }
    getData();

    return () => {
      setData(prev => prev);
      setPosts(prev => prev)
    };
     
  }, [ search, page, searchBy, technology, orderBy, from, to, numAnswers, direction ]);
  if( isLoading ) return <Loading />

  return (
    <StyledInfiniteScroll
    dataLength={ page * limit}
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
  padding-bottom: 100px;
`;