import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getUserInfo } from '../../services/users/getUserInfo';
import { getUserRating } from '../../services/users/getUserRating';
import hunky from '../../assets/hdc-hunky.png';
import moment from 'moment';
import UseAnimations from 'react-useanimations';
import github from 'react-useanimations/lib/github';
import linkedin from 'react-useanimations/lib/linkedin';
import instagram from 'react-useanimations/lib/instagram';
import facebook from 'react-useanimations/lib/facebook';
import twitter from 'react-useanimations/lib/twitter';
import { Button } from '@mui/material';
export const Profile = ({userId}) => {
    const [ userData, setUserData ] = useState({});
    const navigate = useNavigate();
  useEffect(() => {
    async function getData() {
        const [user, rating] = await Promise.all([
            getUserInfo(userId),
            getUserRating(userId),
        ]);
        setUserData({
            ...user,
            rating,
        });
    }
    getData();
  }, [userId])
  
  return (
    <ProfileWrapper>
        <Row>
            <NameContainer>
                <div>
                    <span>Username</span>
                    <p>{`${userData?.name + userData?.lastname?.slice(0,1) + "."} `}</p>
                </div>
                <div>
                    <span>Name</span>
                    <p>{`${userData?.name} ${userData?.lastname}`}</p>
                </div>
                <div>
                    <span>Role</span>
                    <p>{`${userData?.role}`}</p>
                </div>
                {
                    userData?.role !== 'STUDENT' &&
                    <div>
                        <span>Technology</span>
                        <p>{`${userData?.technologyName}`}</p>
                    </div>
                }
            </NameContainer>
            <ImageContainer>
                <img src={userData?.image} alt={`${userData?.name} ${userData?.lastname}`} />
            </ImageContainer>
        </Row>

        <Row>
            <Status>
                <div id='rating'>
                    <span>Rating</span>
                    <div>
                        <p>{userData?.rating}</p>
                        <img src={hunky} alt='hunky' />
                    </div>
                </div>
                <div id='rating'>
                    <span>Member since:</span>
                    <p>{moment(userData?.createdAt).format('LL')}</p>
                </div>
                <div id='rating'>
                    <span>Last login:</span>
                    <p>{moment(userData?.lastAuthUpdate).fromNow()}</p>
                </div>

            </Status>
        </Row>

        <Row>
            <Social>
                    <UseAnimations animation={github} size={40}
                    onClick={ () => window.open("http://www.github.com", "_blank")} />
                    <UseAnimations animation={linkedin} size={40} onClick={ () => window.open("http://www.linkedin.com", "_blank")}/>
                    <UseAnimations animation={instagram} size={40} onClick={ () => window.open("http://www.instagram.com", "_blank")} />
                    <UseAnimations animation={facebook} size={40} onClick={ () => window.open("http://www.facebook.com", "_blank")} />
                    <UseAnimations animation={twitter} size={40} onClick={ () => window.open("http://www.twitter.com", "_blank")}
                    />
            </Social>
        </Row>

        <Row>
            <Publications>
                <Button onClick={ () => navigate(`/users/${userData.id}/posts`)} >
                    Posts
                </Button>
                <Button onClick={ () => navigate(`/users/${userData.id}/answers`)}>
                    Answers
                </Button>
            </Publications>
        </Row>
    </ProfileWrapper>
  )
}

const ProfileWrapper = styled.div`
    margin-top: 1.5em;
    padding: 2.3em 0;
    flex: 0 1 92%;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: center;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  
    & > * {
      flex: 0 1 100%;
    }

    @media (min-width: 768px) {
      flex: 0 1 52%;
      margin: 1.5em;
      & > * {
        flex: 0 1 88%;
      }
    }
`;

const Row = styled.div`
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: space-evenly;
    flex-flow: wrap;
    min-width: 100%;
    max-width: 100%;
    margin: 0 auto;
`;
const NameContainer = styled.div`
    flex: 0 1 60%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: left;
    margin-top: 1em;
    font-size: 1.55em;

    & > div {
        flex: 0 1 100%;
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        justify-content: left;
        margin: 0.2em auto;
    }

    &  span{
        &:after{
            content: ':';
        }
    }
    &  p {
        padding-left: 0.5em;
    }

    @media (min-width: 768px) {
        font-size: 1.8em;
    }
`;

const ImageContainer = styled.div`
    flex: 0 1 25%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;

    & > img {
        width: 100%;
        max-width: 200px;
        border-radius: 10px;
        border: 3px solid rgba(0, 0, 0, 0.1);
        animation: 2s infinite alternate ease-in-out breathing-colour;
    }
`;

const Status = styled.div`
    flex: 0 1 89%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-evenly;
    animation: 2s infinite alternate ease-in-out breathing-colour;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin-top: 1em;

    text-align: center;
    font-size: 1em;

    & > #rating {
        padding: 0.5em;
        & > span {
            display: inline-block;
            font-size: 1.1em;
            text-decoration: underline;
            margin: 0.2em auto 0.6em auto;
        }
        & > div {
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            justify-content: center;
            flex: 0 1 100%;

            p {
                max-width: max-content;
            }
            img {
                width: 0.5em;
            }
        }
    }

    @media (min-width: 768px) {
        font-size: 1.2em;
    }

    @media (min-width: 1024px) {
        font-size: 1.3em;
    }
`;

const Social = styled.div`
    margin-top: 1em;
    flex: 0 1 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-evenly;

    & > * {
        padding: 10px;
        & > * {
            cursor: pointer;
        }
    }
`;

const Publications = styled.div`
    flex: 0 1 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 1em;

    & > button {
        letter-spacing: 0.1em;
        flex: 0 1 40%;
        font-weight: bold;
        background-color: rgba(255, 204, 3, 1);
        transition: all 0.3s ease-in-out;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

        &:hover {
            background-color: rgba(255, 204, 3, 0.8);
            box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        }
    }

`;
