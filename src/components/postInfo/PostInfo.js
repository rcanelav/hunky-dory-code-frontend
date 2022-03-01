import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUserRating } from '../../services/users/getUserRating';
import hunky from '../../assets/hdc-hunky.png';
import moment from 'moment';
import { PostInfoInteractionBar } from './PostInfoInteractionBar';
export const PostInfo = ({ post }) => {
  const { postData, technology, author, likes } = post;
  const userName = author?.name + ' ' + author?.lastname.charAt(0) + '.';
  const [ userRating, setUserRating] = useState();
  const postDate = moment(postData?.createdAt).format('LL');
  const [ views, setViews ] = useState(postData.views);
  useEffect(() => {
    async function getData() {
      try {
        const response = await getUserRating(author?.id);
        setUserRating(response);
        setViews( prev => prev + 1 );
      } catch (error) {
        console.log(error);
      }
    }
    getData();

  }, [author?.id]);

  return (
    <StyledWrapper>
      <StyledPostHeader>
        <div>
          <img src={author.image} alt={author.name} />
            <p>{userName}</p>
          <div>
            <p>{userRating} </p> {<img id='hunky' src={hunky} alt='HUNKY'/>}
          </div>
        </div>
        <div>
          <h1>{postData.title}</h1>
          <div>
            <p>Category: {technology.name}</p>
            <p>📅{postDate}</p>
          </div>
          <p>Views: {views} 👀</p>
        </div>
      </StyledPostHeader>
      <StyledContentWrapper>
        <p dangerouslySetInnerHTML={{__html: postData.content}} />
      </StyledContentWrapper>
      <PostInfoInteractionBar likes={likes} postData={postData} />
    </StyledWrapper>
  );
};

const StyledContentWrapper = styled.div`
  margin: 1.5em auto;
  flex: 0 1 100%;
  min-width: 0px;
  display: flex;
  flex-flow: row wrap;
  word-break: break-all;

  & > p:first-child {
    text-indent: 1em;
    font-size: 1.2em;
    text-align: justify;
    flex: 0 1 100%;
    align-self: center;
  }

  @media (min-width: 768px) {
    & > p:first-child {
      font-size: 1em;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 1.5em auto 0.5em auto;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  padding: 1em;

  @media (min-width: 768px) {
    flex: 0 1 83.5%;
  }

`;

const StyledPostHeader = styled.div`
  flex: 0 1 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;

  & > :first-child {
    flex: 0 1 25%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    text-align: center;

    & > img {
      flex: 0 1 100%;
      width: 50%;
      min-width: 3em;
      max-width: 5em;
      border-radius: 10px;
      margin: 1em auto 0.2em auto;
    }

    & > p  {
      flex: 0 1 100%;
      font-size: 1em;
      align-self: center;
      justify-self: center;
    }

    & > div {
      flex: 0 1 100%;
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: center;
    }

    & > div > p {
      margin-top: 0.2em;
      font-size: 1.5em;
    }

    & > div > img {
      right: 2em;
      width: 0.8em;
      margin-top: 0.2em;
    }
  }

  & > :nth-child(2) {
    flex: 0 1 70%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    margin-left: 0.5em;
    height: 80%;

    & > * {
      flex: 0 1 100%;
    }

    & > h1 {
      flex: 0 1 100%;
      font-size: 1.3em;
    }

    & > div {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;

      & > * {
        font-size: 1em;
        max-width: max-content;
        flex: 0 1 50%;
      }

      & > :last-child {
        align-self: flex-end;
      }
    }
  }
`;
