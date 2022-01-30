import React from 'react';
import styled from 'styled-components';

export const PostInfo = ({ post }) => {
  const { postData, technology, author, likes } = post;
  return (
    <StyledWrapper>
      <StyledPostHeader>
        <div>
          <img src={author.image} alt={author.name} />
          <p>{author.name}</p>
          <p>{author.lastname}</p>
        </div>
        <h1>{postData.title}</h1>
      </StyledPostHeader>
      <p>{postData.content}</p>
      <p>{postData.postedAt}</p>
      <p>{postData.views}</p> 
      <p>{technology.name}</p>
      <p>{likes.totalLikes}</p>
    </StyledWrapper>
  );
};

const StyledPostHeader = styled.div`
  display: flex;
  flex-flow: row wrap;
  border-bottom: 1px solid #ccc;
  align-items: center;
  padding: 10px;
  & > :first-child {
    flex: 0 1 10%;
    & > img {
      width: 3.5em;
      border-radius: 10px;
    }
  }
  & > *:not(:first-child) {
    flex: 0 1 80%;
    margin-left: 0.5em;

    font-size: 1.5em;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  max-width: 87%;
  min-width: 87%;
  margin: 2em auto;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
  padding: 0 0.8em;
  
  & > h1 {
    font-size: 2em;
  }
`;
