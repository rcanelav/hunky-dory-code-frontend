import React from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AsidePostsInfo } from '../components/AsidePostsInfo/AsidePostsInfo';
import { Navbar } from '../components/navbar/Navbar';
import { UserAnswersGrid } from '../components/userAnswers/UserAnswersGrid';
import { useAuthorization } from '../hooks/useAuthorization';

export const UserAnswers = () => {
  const { userProfile } = useAuthorization();
  const userId = useLocation().pathname.split('/')[2];
  const mostRecentPosts = 'search?searchBy=date&direction=desc&order=date&limit=5';
  const mostLikedPosts = 'search?searchBy=titles&direction=desc&order=likes&limit=5';
  const mostAnsweredPosts = 'search?searchBy=numAnswers&order=numAnswers&numAnswers=0';
  const mostViewedPosts = 'search?&searchBy=content&orderBy=views';
  const myPosts = `users/${ userProfile?.userData?.id}/posts?page=1&limit=5`;

  return (
    <ContentWrapper className="animate__animated animate__fadeIn">
        <StyledNavbar />
        <AsideWrapper className="animate__animated animate__fadeIn">
          <AsidePostsInfo url={mostRecentPosts}>
            Recent posts
          </AsidePostsInfo>
          <AsidePostsInfo url={mostLikedPosts}>
            Top rated posts
          </AsidePostsInfo>
        </AsideWrapper>
        <GridWrapper className="animate__animated animate__fadeIn">
          <UserAnswersGrid userId={userId} />
        </GridWrapper>
        <AsideWrapper className="animate__animated animate__fadeIn">
          <AsidePostsInfo url={mostAnsweredPosts}>
            Most answered posts
          </AsidePostsInfo>
          <AsidePostsInfo url={mostViewedPosts}>
            Most viewed posts
          </AsidePostsInfo>
          {
            userProfile?.userData &&
            <AsidePostsInfo url={myPosts}>
              My Posts
            </AsidePostsInfo>
          }
        </AsideWrapper>
      </ContentWrapper>
  )
};

const AsideWrapper = styled.div`
  display: none;
  position: sticky;
  top: 0;

  @media (min-width: 768px) {
    flex: 0 1 20%;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: center;
    height: 80vh;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  min-width: 100%;
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  background-color: rgba(0,163,152, 1);
`;
const GridWrapper = styled.div`
  margin-top: 1.15em;
  flex: 0 1 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: center;
  & > * {
    flex: 0 1 100%;
  }

  @media (min-width: 768px) {
    flex: 0 1 56%;
  }
`;
const StyledNavbar = styled(Navbar)`
  flex: 0 1 100%;
`;
