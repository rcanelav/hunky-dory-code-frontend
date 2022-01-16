import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react'
import styled from 'styled-components';

export const SearchBar = () => {
    const [ tag, setTag ] = useState('');

    const handleChangeTag = (event) => {
        setTag(event.target.value);
      };
    return (
        <StyledSearchBarWrapper>
            <h1>Quick Search</h1>
            <InputLabel id="outlined-basic">Question: </InputLabel>
            <TextField id="outlined-basic" label="Search" variant="outlined" />

            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tag</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tag}
                label="Age"
                onChange={handleChangeTag}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            </FormControl>
        </StyledSearchBarWrapper>
    )
}

const StyledSearchBarWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    justify-content: space-between;
    box-shadow: 4px -4px 13px 1px rgba(0,0,0, 0.2),
                -2px 3px 19px 1px rgba(0,0,0, 0.2);
    min-height: 15vh;
    padding: 5px 10px;

    & h1 {
        font-size: 1.2em;
        text-align: left;
        flex: 1 1 100%;
    }

    & input[type="text"] {
        border-radius: 5px;
        padding: 7px;
    }
`;
