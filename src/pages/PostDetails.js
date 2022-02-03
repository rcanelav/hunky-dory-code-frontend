import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from '../components/navbar/Navbar';
import { PostAnswers } from '../components/postAnswers/PostAnswers';
import { PostInfo } from '../components/postInfo/PostInfo';
import {TextEditor} from '../components/textEditor/TextEditor';
import { useAuthorization } from '../hooks/useAuthorization';
const { REACT_APP_API_URL } = process.env;

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
                const post = await axios.get(`${REACT_APP_API_URL}/api/v1/posts/${id}`);
                setPostInfo(post?.data);
                setIsLoading(false);
            }catch( error ){
                console.log(error);
            }
        }
        getPostData();
    }, [id]);

    const handleSubmit = async () => {
      await axios(
        {
            method: 'POST',
            url: `${REACT_APP_API_URL}/api/v1/posts/${id}/answers`,
            headers: {'Authorization': `Bearer ${userSession}`},
            data: {
              content: newAnswer,
            },
        });
        setPostedAnswer( new Date().toLocaleString() );
    }
    if( isLoading ) return <div>Loading</div>;
  return (
    <>
      <ContentWrapper>
        <StyledNavbar />
        <GridWrapper>
          <PostInfo post={postInfo} />
          {
            postInfo?.technology.id === userProfile?.userData?.technologies
            ?
            <TextEditor value={newAnswer} setValue={setNewAnswer} submit={ handleSubmit } />
            : <p>Debes ser experto en esta tecnología para responder</p>
          }
          <PostAnswers key={postedAnswer} post={postInfo} />
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
  flex: 0 1 90%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`;
const StyledNavbar = styled(Navbar)`
  flex: 0 0 100%;
`;

