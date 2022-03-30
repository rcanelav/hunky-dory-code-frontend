import React from 'react';
import styled from 'styled-components';
import { AsidePostsInfo } from '../components/AsidePostsInfo/AsidePostsInfo';
import { AsideAnswersInfo } from '../components/AsideAnswersInfo/AsideAnswersInfo';
import { Navbar } from '../components/navbar/Navbar';
import { PostsGrid } from '../components/postsGrid/PostsGrid';
import { useAuthorization } from '../hooks/useAuthorization';
import { useQuery } from '../hooks/useQuery';
import { getUrlTypes } from '../utils/helpers/urlTypes';

export const Main = () => {
  const { userProfile } = useAuthorization();
  const query = useQuery();
  const search = query.get('q');
  const searchBy = query.get('searchBy') || 'title';
  const technology = query.get('technology') || '';
  const orderBy = query.get('order') || '';
  const from = query.get('from') || '';
  const to = query.get('to') || '';
  const numAnswers = query.get('numAnswers') || '';
  const direction = query.get('direction') || '';

  let debouncedSearch = { 
    search,
    searchBy,
    technology,
    orderBy,
    from,
    to,
    numAnswers,
    direction,
  }

  const asideUrl = getUrlTypes(userProfile?.userData?.id);
   return (
    <>
      <ContentWrapper className="animate__animated animate__fadeIn">
        <StyledNavbar />
        <AsideWrapper className="animate__animated animate__fadeIn">
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
        <GridWrapper className="animate__animated animate__fadeIn">
          <PostsGrid key={ debouncedSearch.search + new Date().toISOString() } searchData={ debouncedSearch} />
        </GridWrapper>
        <AsideWrapper className="animate__animated animate__fadeIn">
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
  max-width: 1620px;
  margin: 0 auto;
  position: relative;
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
