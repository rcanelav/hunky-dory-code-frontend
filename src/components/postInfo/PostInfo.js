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
  const postDate = moment(postData?.createdAt).format('DD.MM.YYYY');
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
            <p>Date: {postDate} 📅</p>
          </div>
          <p>Views: {views} 👀</p>
        </div>
      </StyledPostHeader>
      <StyledContentWrapper>
        <p>{postData.content}</p>
      </StyledContentWrapper>
      <PostInfoInteractionBar likes={likes} postData={postData} />
    </StyledWrapper>
  );
};

const StyledContentWrapper = styled.div`
  margin: 1em auto 1.5em auto;
  flex: 0 1 100%;
  min-width: 0px;
  display: flex;
  flex-flow: row wrap;
  word-break: break-all;

  & > p:first-child {
    text-indent: 1em;
    font-size: 1.5em;
    text-align: justify;
    text-justify: inter-word;
    flex: 0 1 100%;
    align-self: center;
  }
`;

const StyledWrapper = styled.div`
  min-width: 0px;
  display: flex;
  flex-flow: row wrap;
  flex: 0 1 100%;
  margin: 2em auto;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  padding: 2em;

`;

const StyledPostHeader = styled.div`
  flex: 0 0 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  padding: 10px;

  & > :first-child {
    flex: 0 1 20%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;

    & > img {
      width: 3.5em;
      border-radius: 10px;
      margin: 1em auto 0.2em auto;
    }

    & > p  {
      flex: 0 1 100%;
      font-size: 1.4em;
      align-self: center;
      justify-self: center;
      max-width: max-content;
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
    flex: 0 1 75%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    margin-left: 0.5em;
    height: 80%;

    & > * {
      flex: 0 1 100%;
    }

    & > div {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;

      & > * {
        font-size: 1.2em;
        max-width: max-content;
        flex: 0 1 50%;
      }

      & > :last-child {
        align-self: flex-end;
      }
    }
  }
`;
