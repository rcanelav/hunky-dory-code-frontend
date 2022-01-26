import React from 'react';
import styled from 'styled-components';
import { Navbar } from '../components/navbar/Navbar';
import { PostsGrid } from '../components/postsGrid/PostsGrid';
import { useDebounce } from '../hooks/useDebounce';
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

  let debouncedSearch = useDebounce(search, 400);
  debouncedSearch = { 
    search: debouncedSearch,
    searchBy,
    technology,
    orderBy,
    from,
    to,
    numAnswers,
    direction,
  }

   return (
    <>
      <ContentWrapper>
        <StyledNavbar />
        <GridWrapper>
          <PostsGrid key={ debouncedSearch.search + new Date().toISOString } searchData={ debouncedSearch}/>
        </GridWrapper>
      </ContentWrapper>
    </>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  min-width: 100%;
  max-width: 100%;
  margin: 0 auto;
`;
const GridWrapper = styled.div`
  flex: 0 1 95%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`;
const StyledNavbar = styled(Navbar)`
  flex: 0 1 100%;
`;
