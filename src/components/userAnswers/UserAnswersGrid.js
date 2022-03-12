import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import { getUserAnswers } from '../../services/users/getUserAnswers';
import { PostTitle } from '../postslist/PostTitle';

export const UserAnswersGrid = ({userId}) => {
    const [answersData, setAnswersData] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [ page, setPage ] = useState(1);
    const limit = 10;

    useEffect(() => {
        async function getData() {
            const data = await getUserAnswers(userId, page, limit);
            setAnswersData(data);
            setAnswers( prev => (
                [ ...prev, ...data.results]
            ))
        }
        getData();
    }, [userId, page]);

    return (
    <StyledInfiniteScroll
    dataLength={ page * limit}
    next={ () => setPage( prev => prev + 1 ) }
    hasMore={ !!answersData.next }

    className="animate__animated animate__fadeIn"
    >
      <StyledPostsWrapper>
        {
          answers?.map(item => (
            <PostTitle
              key={item.answerId}
              title={item.title}
              date={item.answerCreatedAt}
              author={`${item.name} ${item.username}`}
              userImage={item.image}
              userId={item.postedBy}
              content={item.answerContent}
              postId={item.id}
              data={{
                  ...item,
                  likes: item.answerLikes
              }}
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
  & >:last-child {
    margin-bottom: 20px;
  }
`;
