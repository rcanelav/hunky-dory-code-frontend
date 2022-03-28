import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { searchPublication } from '../../services/posts/searchPublication';
export const AsidePostsInfo = ({children, url }) => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      async function getData () {
        const results = (await searchPublication( url )).results
        setPosts(results);
      }
      getData();

    }, [url]);

  return (
      <Wrapper posts={!!posts?.length}>
            <h1 onClick={ () => navigate(`/${url}`)}>{children}</h1>
            {
                posts.map(post => (
                    <div key={post.id} onClick={ () => navigate(`/posts/${post.id}`)}>
                        <div id='img-container'>
                            <img src={post.userImage} alt="author" />
                            <p> {post.userName} {post.userLastname.slice(0,1)}.</p>
                        </div>
                        <div id='content-container'>
                            <h2>{post.title.slice(0, 24)} <span>...</span></h2>
                            <p dangerouslySetInnerHTML={{__html: post.content.slice(0, 30)+ '...'}} />
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
    display: ${({posts}) => posts ? 'flex' : 'none'};
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    border-radius: 10px;
    margin: 1.5em 0.5em;
    flex: 0 1 100%;
    flex-flow: row wrap;
    max-height: 22.35em;
    word-break: break-all;
    overflow-y: hidden;
    & > * {
        flex: 0 1 90%;
    }

    & > h1 {
        position: relative;
        margin: 0.5em 0 0.3em 1em;
        font-size: 0.8em;
        cursor: pointer;
        max-width: max-content;

        &:after {
            content: '';
            position: absolute;
            border-top: 2.5px solid rgba( 0, 0 ,0 , 0.1);
            height: 0px;
            width: 0;
            left: 0;
            bottom: -2px;
            transition: 0.3s;
            animation: 2s infinite alternate ease-in-out breathing-colour;
        }

        &:hover:after {
            width: 100%;
        }
    }

    & > div {
        padding: 0.2em;
        background-color: rgba(215, 215, 215, 0.6);
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        border-radius: 10px;
        margin: 0.3em auto;
        max-height: 4.1em;
        min-height: 4.1em;
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
            background-color: rgba(199, 199, 199, 0.65);
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
        border: 1.5px solid rgba(0, 0, 0, 0.1);
        animation: 2s infinite alternate ease-in-out breathing-colour;
        @keyframes breathing-colour {
            from {
                border-color: rgba(232,55,128,1);
                box-shadow: rgba(0,163,152,0.4) 0px 2px 5px -1px, rgba(0,163,152,0.3) 0px 1px 3px -1px;
            }
            to {
                border-color: rgba(0,163,152,1);
                box-shadow: rgba(232,55,128,0.25) 0px 2px 5px -1px, rgba(232,55,128,0.3) 0px 1px 3px -1px;
            }
        }
    }

    & #info {
        position: absolute;
        bottom: 0.30em;
        right: 1em;
        font-size: 0.55em;
    }

    @media (min-width: 1024px) {
        max-height: 16.72em;
        & > div {
            min-height: 2.62em;
            max-height: 2.62em;
        }
        & > h1 {
            font-size: 0.9em;
        }
    }
`;
