import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { PostTitle } from '../components/postslist/PostTitle';
const { REACT_APP_API_URL } = process.env;

export const Main = () => {
  const [searchParams ] = useSearchParams();
  const [ data, setData ] = useState([]);
  const searchValue = searchParams.get('q');
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/search?q=${searchValue || ''}`);
      setData(response.data)
    }
    fetchData();
  }, [ searchValue ]);
  
  const handleFirstPage = async() => {
    if( !data.previous ) return;
    const response = await axios.get(`${REACT_APP_API_URL}/api/v1/search?q=${searchValue || ''}&page=1`);
    setData(response.data)
  };
  const handleLastPage = async() => {
    if( !data.next ) return;
    const response = await axios.get(`${REACT_APP_API_URL}/api/v1/search?q=${searchValue || ''}&page=${ data.totalPages }`);
    setData(response.data)
  };
  const handleNextPage = async () => {
    if(!data.next) return;
    const response = await axios.get(`${REACT_APP_API_URL}/api/v1/search?q=${searchValue || ''}&page=${data.next.page}`);
    setData(response.data)
  };
  const handlePreviousPage = async () => {
    if(!data.previous) return;
    const response = await axios.get(`${REACT_APP_API_URL}/api/v1/search?q=${searchValue || ''}&page=${data.previous.page}`);
    setData(response.data)
  };

  return (
    <>
      <StyledPostsWrapper>
        {
          data.results?.map(item => (
            <PostTitle
              key={item.id}
              title={item.title}
              date={item.postedAt}
              author={`${item.userName} ${item.userLastname}`}
              userImage={item.userImage}
              userId={item.postedBy}
              content={item.content}
            />
          ))
        }
      </StyledPostsWrapper>
        <StyledButtonsContainer>
          <StyledEndsButton onClick={ handleFirstPage } disabled={!data.previous}>First</StyledEndsButton>
          <StyledPreviousPageButton
                    onClick={ handlePreviousPage } disabled={!data.previous}>
            Previous
          </StyledPreviousPageButton>
          <StyledNextPageButton
                    onClick={handleNextPage} disabled={!data.next}>
            Next
          </StyledNextPageButton>
          <StyledEndsButton
                    onClick={ handleLastPage } disabled={!data.next}>
            Last
          </StyledEndsButton>

        </StyledButtonsContainer>
    </>
  );
};

const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1em 0;
  width: 92%;
  margin: 0 auto 2vh auto;
  & > button {
    font-weight: bold;
  }
  & > button:disabled {
    background-color: gray;
    color: white;
  }

  & > button:not(:disabled):hover {
    background-color: black;
    color: white;
  }
  @media (min-width: 768px) {
    max-width: 50%;
    min-width: 50%;

    & > button {
      font-size: 1.5em;
      padding: 0.5em 1em;
    }
  }
`;
const StyledEndsButton = styled(Button)`
  && {
    margin: 1em 0;
    width: 22%;
    background-color: black;
    color: yellow;
  }
`;

const StyledNextPageButton = styled(Button)`
  && {
    margin: 1em 0;
    width: 22%;
    background-color: yellow;
    color: black;
    font-weight: bold;
  }
`;

const StyledPreviousPageButton = styled(Button)`
  && {
    margin: 1em 0;
    width: 22%;
    background-color: yellow;
    color: black;
  }
`;

const StyledPostsWrapper = styled.div`
  margin: 0 auto;
  max-width: 90%;
  min-width: 90%;

  @media (min-width: 768px) {
    max-width: 50%;
    min-width: 50%;
  }
`;
