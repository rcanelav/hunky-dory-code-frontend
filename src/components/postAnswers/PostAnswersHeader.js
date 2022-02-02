import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
const { REACT_APP_API_URL } = process.env;
export const PostAnswersHeader = ({ date, author }) => {
    const [ authorData, setAuthorData ] = useState('');
    const [ isLoading, setIsLoading ] = useState(true);
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
                <img src={ authorData?.image } alt={`${ authorData?.name } ${authorData?.lastname}`}/>
                <p>{authorData?.name} { authorData?.lastname?.charAt(0) }</p>
                <p>rating { authorData?.rating }</p>
            </StyledProfileCard>
            <StyledHeaderText>
                {date}
            </StyledHeaderText>
        </StyledHeaderWrapper>
    )
};

const StyledHeaderText = styled.div`
    flex: 0 1 50%;
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

    & > img {
        border-radius: 10px;
        width: 3.5em;
    }
    &  > p {
        width: max-content;
        font-size: 1.5em;
    }
`;

const StyledHeaderWrapper = styled.div`
    flex: 0 1 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: space-between;
    justify-content: space-between;
    margin-bottom: 1.5em;
`;
