import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const { REACT_APP_API_URL } = process.env;
export const AsidePostsInfo = ({children, url }) => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      async function getData () {
        const response = await axios.get(`${REACT_APP_API_URL}/api/v1/${url}`);
        setPosts(response?.data.results);
      }
      getData();

    }, [url]);
    console.log(posts);

  return (
      <Wrapper>
            <h1>{children}</h1>
            {
                posts.map(post => (
                    <div key={post.id} onClick={ () => navigate(`/posts/${post.id}`)}>
                        <div id='img-container'>
                            <img src={post.userImage} alt="author" />
                            <p> {post.userName} {post.userLastname.slice(0,1)}.</p>
                        </div>
                        <div id='content-container'>
                            <h2>{post.title.slice(0, 20)} <span> [...] </span></h2>
                            <p>{post.content.slice(0, 40)} <span> [...]</span></p>
                        </div>
                        <div id='info'>
                            <p>⚡:{post.likes} 👀:{post.views} 📢:{post.numAnswers}</p>
                        </div>
                    </div>
                ))
            }
      </Wrapper>
  );
}

const Wrapper = styled.div`
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    border-radius: 10px;
    margin: 1.5em 0.5em;
    flex: 0 1 100%;
    display: flex;
    flex-flow: row wrap;
    max-height: 16.1em;
    word-break: break-all;
    overflow-y: hidden;
    & > * {
        flex: 0 1 90%;
    }

    & > h1 {
        margin: 0.5em 0 0 1em;
        font-size: 0.8em;
    }

    & > div {
        padding: 0.2em;
        background-color: rgba(206, 206, 206, 0.4);
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        border-radius: 10px;
        margin: 0.3em auto;
        max-height: 2.62em;
        min-height: 2.62em;
        cursor: pointer;
        position: relative;

        display: flex;
        flex-flow: row wrap;
        overflow-y: hidden;
        transition: all 0.3s ease-in-out;
        & > * {
            flex: 0 1 100%;
        }

        &:hover {
            background-color: rgba(206, 206, 206, 0.8);
            box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.8) 0px 1px 3px -1px;
        }
        & > div#img-container {
            flex: 0 1 20%;
            display: flex;
            flex-flow: row wrap;
            justify-content: center; 
            align-items: center;
            height: 90%;        
            & > img {
                margin: 0 auto;
                width: 45%;
                border-radius: 5px;
            }
            & > p {
                text-align: center;
                font-size: 0.6em;
                flex: 0 1 100%;
            }
        }

        & > div#content-container {
            flex: 0 1 75%;
        
            & > h2 {
                flex: 0 1 100%;
                font-size: 0.7em;
                margin: 0.3em 0 0 1em;
            }
    
            & > p {
                font-size: 0.65em;
                margin: 0.1em auto 0.3em 0.8em;
            }
        }

        &:last-child {
            margin: 0.3em auto 0.5em auto;
        }

        & span {
            font-size: 0.8em;
            color: gray;
        }
    }

    & > :nth-child(2) {
        position: relative;
        ::after{
            content: "🥇";
            position: absolute;
            right: 0.5em;
            font-size: 0.8em;
        }
    }

    & #info {
        position: absolute;
        bottom: 0.30em;
        right: 1em;
        font-size: 0.55em;
    }
`;