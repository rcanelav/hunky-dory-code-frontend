import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from '../components/navbar/Navbar';
import { PostAnswers } from '../components/postAnswers/PostAnswers';
import { PostInfo } from '../components/postInfo/PostInfo';
import {TextEditor} from '../components/textEditor/TextEditor';
import { useAuthorization } from '../hooks/useAuthorization';
import { AsidePostsInfo } from '../components/AsidePostsInfo/AsidePostsInfo';
import UseAnimations from 'react-useanimations';
import alertOctagon from 'react-useanimations/lib/alertOctagon';
import { getPostById } from '../services/posts/getPostById';
import { setPostView } from '../services/posts/setPostView';
import { Loading } from '../components/loading/Loading';
import { AsideAnswersInfo } from '../components/AsideAnswersInfo/AsideAnswersInfo';
import { createAnswer } from '../services/posts/createAnswer';
import { getUrlTypes } from '../utils/helpers/urlTypes';

export const PostDetails = () => {
  const { userSession, userProfile } = useAuthorization();
  const { id } = useParams();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ postInfo, setPostInfo ] = useState();
  const [ newAnswer, setNewAnswer ] = useState('');
  const [ postedAnswer, setPostedAnswer ] = useState( new Date().toLocaleString() );

  useEffect(() => {
    async function getPostData() {
        try{
            const [ postData ] = await Promise.all([
              getPostById(id),
              setPostView(id),
            ]);
            setPostInfo(postData);
            setIsLoading(false);
        }catch( error ){
            console.log(error);
        }
    }
    getPostData();
  }, [id]);

  const handleSubmit = async () => {
    await createAnswer(id, newAnswer, userSession);
    setPostedAnswer( new Date().toLocaleString() );
  }

  const asideUrl = getUrlTypes(userProfile?.userData?.id);
  if( isLoading ) return <Loading />;

  return (
    <>
      <ContentWrapper className='animate__animated animate__fadeIn'>
        <StyledNavbar />
        <AsideWrapper>
          <AsidePostsInfo url={asideUrl.mostRecentPosts}>
            Recent posts
          </AsidePostsInfo>
          <AsidePostsInfo url={asideUrl.mostLikedPosts}>
            Top rated posts
          </AsidePostsInfo>
          {
            userProfile?.userData &&
            <AsideAnswersInfo url={asideUrl.myAnswers}>
              My Answers
            </AsideAnswersInfo>
          }
        </AsideWrapper>
        <GridWrapper>
          <PostInfo key={ postInfo?.postData?.id } post={postInfo} />
          {
            (userProfile?.userData?.id === postInfo?.author?.id || postInfo?.technology.id === userProfile?.userData?.technologies || userProfile?.userData?.role === 'ADMIN')
            ?
            <TextEditor value={newAnswer} setValue={setNewAnswer} submit={ handleSubmit } />
            : <div id='disallowed-reply'>
                <UseAnimations
                    size={30}
                    animation={alertOctagon}
                    strokeColor='red'
                />
                <p>Debes ser experto en esta tecnología para responder a esa pregunta.</p>
            </div>
          }
          <PostAnswers key={postedAnswer + new Date()} post={postInfo} />
        </GridWrapper>
        <AsideWrapper>
          <AsidePostsInfo url={asideUrl.mostAnsweredPosts}>
            Most answered posts
          </AsidePostsInfo>
          <AsidePostsInfo url={asideUrl.mostViewedPosts}>
            Most viewed posts
          </AsidePostsInfo>
          {
            userProfile?.userData &&
            <AsidePostsInfo url={asideUrl.myPosts}>
              My Posts
            </AsidePostsInfo>
          }
        </AsideWrapper>
      </ContentWrapper>
    </>
  );
};

const AsideWrapper = styled.div`
  display: none;
  position: sticky;
  top: 0;
  max-height: 698px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: scroll;
  overflow: scroll;
  scrollbar-width: none;

  @media (min-width: 768px) {
    flex: 0 1 20%;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: center;
    height: 100vh;

    & > *:not(:first-child) {
      margin-top: -0.85em;
    }
  }
  @media (min-height: 900px) {
    max-height: 874px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  flex-flow: wrap;
  max-width: 1620px;
  margin: 0 auto;
`;
const GridWrapper = styled.div`
  flex: 0 1 92%;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: center;

  & > * {
    flex: 0 1 100%;
  }

  & > div#disallowed-reply {
    flex: 0 1 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    border: 3px solid rgba(0, 0, 0, 0.5);
    padding: 0.5em;
    margin-bottom: 0.5em;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    text-align: center;
    p {
      font-style: italic;
      font-size: 1em;
      padding: 0.2em;
      :after{
        content: '👩‍🏫';
        font-style: normal;
      }
    }
    animation: 2s infinite alternate ease-in-out breathing-colour;
    @keyframes breathing-colour {
      from {
        border-color: rgba(232,55,128,1);
        box-shadow: rgba(232,55,128,0.25) 0px 2px 5px -1px, rgba(232,55,128,0.3) 0px 1px 3px -1px;
      }
      to {
        border-color: rgba(0,163,152,1);
        box-shadow: rgba(0,163,152,0.25) 0px 2px 5px -1px, rgba(0,163,152,0.3) 0px 1px 3px -1px;
      }
    }
  }

  @media (min-width: 768px) {
    flex: 0 1 56%;
    & > * {
      flex: 0 1 88%;
    }
    & >:nth-child(2) {
      flex: 0 1 92.5%;
    }
    & > div#disallowed-reply {
      flex: 0 1 89.85%;
    }
    & >:last-child {
      flex: 0 1 92%;
    }
  }
`;
const StyledNavbar = styled(Navbar)`
  flex: 0 0 100%;
`;

