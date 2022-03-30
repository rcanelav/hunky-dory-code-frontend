import { TextField } from '@mui/material';
import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export const Search = ({ search, setSearch }) => {
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        navigate('/search?q=' + search);
    }
    return (
        <StyledWrapper>
            <StyledSearchInput 
                id="standard-basic"
                label="Search..."
                variant="standard"
                size="small"
                value={ search }
                onChange={ e => setSearch(e.target.value) }
                onKeyDown={ e => e.key === 'Enter' && handleSubmit(e) }
            />
            <StyledSearchIcon onClick={ e => handleSubmit(e)} />
        </StyledWrapper>
    )
}
const StyledWrapper = styled.div`
    position: absolute;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    min-width: 80%;
    max-width: 80%;
    border-radius: 11px;
    border: 2px solid white;
    padding-bottom: 0.3em;
    background: rgb(0,0,0);
    background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 60%, rgba(255,255,255,0) 100%);

    @media (min-width: 768px) {
        max-width: 50%;
        min-width: 50%;
    }
`;

const StyledSearchIcon = styled(SearchIcon)`
    && {
        position: absolute;
        right: 0.2em;
        margin-top: 0.3em;
        border-radius: 50%;
        font-size: 1.8em;
        cursor: pointer;
        color: white;
        @media (min-width: 768px) {
            font-size: 1.6em;
            right: 0.5em;
        }
    }
`;

const StyledSearchInput = styled(TextField)`
    &&  {
        margin: 0 auto;
        width: 95%;

        & .MuiInput-input {
            max-width: 92%;
            font-size: 1.1em;
            color: white;
        }
        & #standard-basic-label {
            font-size: 1.2em;
            color: white;
        }
        & .MuiInput-underline:before,
        .MuiInput-underline:after,
        .MuiInput-underline:hover:before{
            border-bottom: none
        }

    }
`;
