import { TextField } from '@mui/material';
import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export const Search = ({ search, setSearch }) => {
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        navigate('/main?q=' + search);
    }
    return (
        <StyledWrapper>
            <StyledSearchInput 
                id="standard-basic"
                label="Search..."
                variant="standard"
                size="medium"
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
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    min-width: 80%;
    max-width: 80%;
`;

const StyledSearchIcon = styled(SearchIcon)`
    && {
        position: absolute;
        right: 0;
        margin-top: 0.6em;
        border-radius: 50%;
        font-size: 1.8em;
        cursor: pointer;
    }
    `;

const StyledSearchInput = styled(TextField)`
    &&  {
        margin: 0 auto;
        width: 95%;
        & .MuiInput-input {
            max-width: 92%;
            font-size: 1.25em;
        }
        & #standard-basic-label {
            font-size: 1.4em;
        }
    }
`;
