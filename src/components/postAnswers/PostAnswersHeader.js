import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import hunky from '../../assets/hdc-hunky.png';
import { useNavigate } from 'react-router-dom';
const { REACT_APP_API_URL } = process.env;
export const PostAnswersHeader = ({ date, author }) => {
    const [ authorData, setAuthorData ] = useState('');
    const [ isLoading, setIsLoading ] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        async function getData(){
            const authorInfo = await axios.get(`${REACT_APP_API_URL}/api/v1/users/${author}`);
            setAuthorData(authorInfo?.data.userData);
            const rating = await axios.get(`${REACT_APP_API_URL}/api/v1/users/${author}/rating`);
            setAuthorData(prev => ({ ...prev, rating: rating.data.rating}));
        }
        getData();
        setIsLoading(false);
    }, [author, authorData.id ]);
    if(isLoading) return <div>IsLoading</div>
    return (
        <StyledHeaderWrapper>
            <StyledProfileCard>
                <div>
                    <img src={ authorData?.image } alt={`${ authorData?.name } ${authorData?.lastname}`}
                    onClick={ () => navigate(`/users/${authorData.id}/profile`)} />
                </div>
                <p>{authorData?.name} { authorData?.lastname?.charAt(0) }</p>
                <div id='rating'>
                    (<p>{authorData?.rating}</p>
                    <img src={ hunky } alt='hunky'/>
                    )
                </div>
            </StyledProfileCard>
            <StyledHeaderText>
                📅 {moment(date).format('LL')}
            </StyledHeaderText>
        </StyledHeaderWrapper>
    )
};

const StyledHeaderText = styled.div`
    flex: 0 1 70%;
    display: flex;
    flex-flow: row wrap;
    justify-content: right;
`;
const StyledProfileCard = styled.div`
    flex: 0 1 25%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;

    & > * {
        flex: 0 1 100%;
        text-align: center;
    }

    & > div{
        flex: 0 1 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        img:first-child {
            width: 50%;
            max-width: 5em;
            border-radius: 10px;
            box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
            border: 3px solid rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: all 0.1s ease-in-out;
            &:hover {
                transform: scale(1.03);
            }
        }
    }
    &  > p {
        margin-top: 0.5em;
        width: max-content;
        font-size: 1.2em;
    }
    & > div#rating {
        img {
            position: relative;
            top: 0.2em;
            box-shadow: none;
            border: none;
            width: 0.7em;
        }
`;

const StyledHeaderWrapper = styled.div`
    flex: 0 1 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: space-between;
    justify-content: space-between;
    margin-bottom: 1em;
    padding: 0.5em;
`;
