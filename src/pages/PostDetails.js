import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from '../components/navbar/Navbar';
import { PostInfo } from '../components/postInfo/PostInfo';
const { REACT_APP_API_URL } = process.env;

export const PostDetails = () => {
    const { id } = useParams();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ postInfo, setPostInfo ] = useState();
    useEffect(() => {
        async function getPostData() {
            try{
                const post = await axios.get(`${REACT_APP_API_URL}/api/v1/posts/${id}`);
                setPostInfo(post?.data);
                setIsLoading(false);
            }catch( error ){
                console.log(error);
            }
        }
        getPostData();
    }, [id]);
    console.log(postInfo);

    if( isLoading ) return <div>Loading</div>;

  return (
    <>
      <ContentWrapper>
        <StyledNavbar />
        <GridWrapper>
          <PostInfo post={postInfo} />
        </GridWrapper>
      </ContentWrapper>
    </>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  min-width: 100%;
  max-width: 100%;
  margin: 0 auto;
`;
const GridWrapper = styled.div`
  flex: 0 0 92%;
  max-width: 92%;
  display: flex;
  flex-flow:  wrap;
  align-items: center;
  justify-content: center;
`;
const StyledNavbar = styled(Navbar)`
  flex: 0 0 100%;
`;

