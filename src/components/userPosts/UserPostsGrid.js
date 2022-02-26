import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import { getUserPosts } from '../../services/users/getUserPosts';
import { PostTitle } from '../postslist/PostTitle';

export const UserPostsGrid = ({userId}) => {
    const [postsData, setPostsData] = useState([]);
    const [posts, setPosts] = useState([]);
    const [ page, setPage ] = useState(1);
    const limit = 10;

    useEffect(() => {
        async function getData() {
            const data = await getUserPosts(userId, page, limit);
            setPostsData(data);
            setPosts( prev => (
                [ ...prev, ...data.results]
            ))
        }
        getData();
    }, [userId, page]);
  return (
    <StyledInfiniteScroll
    dataLength={ page * limit}
    next={ () => setPage( prev => prev + 1 ) }
    hasMore={ !!postsData.next }

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
  )
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
