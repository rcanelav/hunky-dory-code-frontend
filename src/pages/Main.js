import React from 'react';
import styled from 'styled-components';
import { AsidePostsInfo } from '../components/AsidePostsInfo/AsidePostsInfo';
import { Navbar } from '../components/navbar/Navbar';
import { PostsGrid } from '../components/postsGrid/PostsGrid';
import { useQuery } from '../hooks/useQuery';

export const Main = () => {
  const query = useQuery();
  const search = query.get('q');
  const searchBy = query.get('searchBy') || 'title';
  const technology = query.get('technology') || '';
  const orderBy = query.get('orderBy') || '';
  const from = query.get('from') || '';
  const to = query.get('to') || '';
  const numAnswers = query.get('numAnswers') || '';
  const direction = query.get('direction') || '';

  // let debouncedSearch = useDebounce(search, 400);
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
  const mostRecentPosts = 'search?searchBy=date&direction=desc&order=date&limit=5';
  const mostLikedPosts = 'search?searchBy=titles&direction=desc&order=likes&limit=5';
  const mostAnsweredPosts = 'search?searchBy=numAnswers&order=numAnswers&numAnswers=0';
  const mostViewedPosts = 'search?&searchBy=content&orderBy=views';

   return (
    <>
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
          <PostsGrid key={ debouncedSearch.search + new Date().toISOString() } searchData={ debouncedSearch} />
        </GridWrapper>
        <AsideWrapper className="animate__animated animate__fadeIn">
          <AsidePostsInfo url={mostAnsweredPosts}>
            Most answered posts
          </AsidePostsInfo>
          <AsidePostsInfo url={mostViewedPosts}>
            Most viewed posts
          </AsidePostsInfo>
        </AsideWrapper>
      </ContentWrapper>
    </>
  );
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
    flex: 0 1 60%;
  }
`;
const StyledNavbar = styled(Navbar)`
  flex: 0 1 100%;
`;
