import { Alert, Button, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import moment from 'moment';
import UseAnimations from 'react-useanimations';
import  maximizeMinimize2  from 'react-useanimations/lib/maximizeMinimize2';
import { BurgerIcon } from '../burgerIcon/BurgerIcon';
const { REACT_APP_API_URL } = process.env;

export const SearchBar = ({openMenu, setOpenMenu}) => {
    const [ technologyData, setTechnologyData ] = useState();
    const [ searchData, setSearchData ] = useState('');
    const [ technology, setTechnology ] = useState('');
    const [ searchBy, setSearchBy ] = useState('title');
    const [ initialDate, setInitialDate ] = useState('');
    const [ finalDate, setFinalDate ] = useState('');
    const [ numAnswers, setNumAnswers ] = useState('');
    const [ orderBy, setOrderBy ] = useState('init');
    const [ direction, setDirection ] = useState('init');
    const [ open, setOpen ] = useState(false);
    const navigate = useNavigate();

    useEffect( () => {
        async function getTechnologies () {
            const response = await axios.get(`${REACT_APP_API_URL}/api/v1/technologies`);
            setTechnologyData( response.data.technologies );
        }
        getTechnologies();

    }, []);
    const handleSubmit = () => {
        navigate(`/search?q=${ searchData || ''}`+
                        `${ searchBy  === 'title' ? '&searchBy=title' : ''}`+
                        `${ searchBy === 'content' ? '&searchBy='+searchBy: ''}`+
                        `${ (searchBy === 'technology' && technology.length > 1)
                            ? '&searchBy='+searchBy+'&technology='+technology:''}`+
                        `${ searchBy === 'date' && initialDate.length > 0 && finalDate.length > 0  && initialDate < finalDate ? '&searchBy='+searchBy+'&from='+initialDate+'&to='+finalDate:''}`+
                        `${ searchBy === 'numAnswers' && numAnswers && typeof parseInt(numAnswers) === 'number' ? '&searchBy='+searchBy+'&numAnswers='+numAnswers:''}`+
                        `${ orderBy && orderBy !== 'init' ? '&order='+orderBy : ''}`+
                        `${ direction && direction !== 'init' ? '&direction='+direction : ''}`
        );
    }
    const handleReset = () => {
        setSearchData('')
        setTechnology('' )
        setSearchBy('title')
        setInitialDate( '')
        setFinalDate('')
        setNumAnswers('')
        setOrderBy('postedAt')
        setDirection('DESC')
    }
    return (
        <StyledSearchBarWrapper>
            <form onSubmit={ handleSubmit } onKeyDown={ e => e.key === 'Enter' && handleSubmit()} >
                <SearchContainer>
                    <p>Quick Search</p>
                    <BurgerIcon open={ openMenu } setOpen={ setOpenMenu } />
                    <TextField id="outlined-basic" size='small' label="Search" variant="outlined"
                    onKeyDown={ e => e.key === 'Enter' && handleSubmit() }
                    value={ searchData }
                    onChange={ (e) => setSearchData(e.target.value)}
                    />
                </SearchContainer>
                <SearchByContainer open={open} className="animate__animated animate__fadeIn">
                    <p>Search By</p>
                    <RadioGroup row aria-label="search By" name="row-radio-buttons-group" onChange={ (e) => setSearchBy( e.target.value )} value={searchBy}>
                        <FormControlLabel value="title" control={<Radio />} label="Title" />
                        <FormControlLabel value="content" control={<Radio />} label="Content" />
                        <FormControlLabel value="technology" control={<Radio />} label="Technology" />
                        <FormControlLabel value="date" control={<Radio />} label="Date" />
                        <FormControlLabel value="numAnswers" control={<Radio />} label="Nº Answers" />
                    </RadioGroup>
                </SearchByContainer>
                {
                    searchBy === 'technology' &&
                    <TechnologiesContainer>
                        <p>Select your technology</p>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={technology}
                        label="Technology"
                        onChange={ (e) =>  setTechnology( e.target.value ) }
                        size='small'
                    >
                        <MenuItem disabled value="">
                            <em>Technologies</em>
                        </MenuItem>
                        {
                            technologyData?.map( item => (
                                <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                            ))
                        }
                    </Select>
                </TechnologiesContainer>
                }

                {
                    searchBy === 'date' &&
                    <DateContainer>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                disableFuture
                                label="FROM"
                                openTo="year"
                                views={['day', 'month', 'year']}
                                value={initialDate}
                                onChange={(newValue) => {
                                    setInitialDate(moment(newValue).format('YYYY-MM-DD'));
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <DatePicker
                                disableFuture
                                label="TO"
                                openTo="year"
                                views={['day', 'month', 'year']}
                                value={finalDate}
                                onChange={(newValue) => {
                                    setFinalDate(moment(newValue).format('YYYY-MM-DD'));
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        {
                            initialDate > finalDate && 
                            <Alert severity="error">Dates are wrong. Impossible to set end date before initial date.</Alert>
                        }
                    </DateContainer>
                }

                {
                    searchBy === 'numAnswers' &&
                    <NumAnswersContainer>
                        <p>Insert a number between 0 and: </p>
                        <TextField id="outlined-basic" label="Max answers quantity" size='small'
                        value={ numAnswers }variant="outlined" onChange={ (e) => setNumAnswers(e.target.value) } />
                    </NumAnswersContainer>
                }

                <SortContainer open={open} className="animate__animated animate__fadeIn">
                    <div>
                        <p>Order By</p>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={orderBy}
                            label="Technology"
                            size='small'
                            onChange={ (e) => setOrderBy( e.target.value ) }
                        >
                            <MenuItem disabled value="init">
                                <em>Order By</em>
                            </MenuItem>
                            <MenuItem value="postedAt">Date</MenuItem>
                            <MenuItem value="likes">Likes</MenuItem>
                            <MenuItem value="numAnswers">Answers</MenuItem>
                            <MenuItem value="views">Views</MenuItem>
                            <MenuItem value="title">Title</MenuItem>
                        </Select>
                    </div>
                    <div>
                        <p>Direction</p>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={direction}
                            label="Direction"
                            size='small'
                            onChange={ (e) => setDirection(e.target.value)}
                        >
                            <MenuItem disabled value="init">
                                <em>Direction</em>
                            </MenuItem>
                            <MenuItem value="ASC">Ascending</MenuItem>
                            <MenuItem value="DESC">Descending</MenuItem>
                        </Select>
                    </div>
                </SortContainer>
                <ResetButton onClick={ () => handleReset() } open={open} className="animate__animated animate__fadeIn">Reset</ResetButton>
            </form>
            <BottomContainer>
                <NewQuestion variant='contained' onClick={ () => navigate('/newPost')}>New question</NewQuestion>
                <UseAnimations
                    reverse={open}
                    onClick={() => {
                    setOpen(!open);
                    }}
                    size={25}
                    wrapperStyle={{  marginRight: 0 }}
                    animation={maximizeMinimize2}
                />
            </BottomContainer>

        </StyledSearchBarWrapper>
    )
}

const NewQuestion = styled(Button)`
    &&{
        font-size: 0.6em;
        font-weight: medium;
    }
`;
const BottomContainer = styled.div`
    display: flex;
    flex: 0 1 100%;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    margin-top: 0.5em;
`;

const ResetButton = styled(Button)`
    flex: 0 1 100%;
    &&{
        display: ${({ open }) => open ? 'flex' : ' none'};
        margin-top: 0.5em;
        color: black;
        font-weight: medium;
        background-color: #f5f5f5;

        &:hover{
            background-color: #e6e6e6;
        }
    }
`;
const SortContainer = styled.div`
    flex: 0 1 100%;
    display: ${({ open }) => open ? 'flex' : ' none'};
    flex-flow: row wrap;
    margin-top: 0.5em;
    justify-content: space-between;
    & > * {
        flex: 0 1 45%;
        display: flex;
        flex-flow: row wrap;
        & > * {
            flex: 0 0 100%;
        }
        & p {
            flex: 0 1 100%;
            font-weight: bold;
            text-align: left;
            margin-bottom: 0.5em;
        }
    }
`;
const NumAnswersContainer = styled.div`
    flex: 0 1 100%;
    display: flex;
    flex-flow: row wrap;
    margin-top: 0.5em;
    & > div {
        flex: 0 1 100%;
    }
    & p {
        flex: 0 1 100%;
        font-weight: bold;
        text-align: left;
        margin-bottom: 0.2em;
    }
`;

const DateContainer = styled.div`
    flex: 0 1 100%;
    display: flex;
    flex-flow: row wrap;
    margin-top: 0.5em;
    justify-content: space-between;
    & > * {
        flex: 0 1 45%;
    }
    & > :nth-child(3) {
        flex: 0 1 100%;
        margin-top: 0.5em;
    }
    
`;

const TechnologiesContainer = styled.div`
    flex: 0 1 100%;
    display: flex;
    flex-flow: row wrap;
    margin-top: 0.5em;

    & > div {
        flex: 0 1 100%;
    }
    & p {
        flex: 0 1 100%;
        font-weight: bold;
        text-align: left;
        margin-bottom: 0.2em;
    }
`;

const SearchByContainer = styled.div`
    flex: 0 1 100%;
    display: ${({ open }) => open ? 'flex' : ' none'};
    flex-flow: row wrap;
    margin-top: 0.5em;
    & p {
        flex: 0 1 100%;
        font-weight: bold;
        text-align: left;
        margin-bottom: 0.2em;
    }
    & > div {
        flex: 0 1 100%;
        justify-content: center;

        display: flex;
        flex-flow: row wrap;
    }
    & span {
        font-size: 0.8em;
    }

`;
const SearchContainer = styled.div`
    position: relative;
    flex: 0 1 100%;
    display: flex;
    flex-flow: row wrap;
    & p {
        flex: 0 1 100%;
        font-weight: bold;
        justify-content: center;
        margin-bottom: 0.5em;
        text-align: left;
    }
    & > :nth-child(2) {
        top: -15px;
        right: -10px;
    }
    & > .MuiFormControl-root {
        flex: 0 1 100%;
    }

    @media (min-width: 768px) {
        & > :nth-child(2) {
            display: none;
        }
        & > div.MuiFormControl-root {
            flex: 0 1 100%;
        }
        & #outlined-basic-label {
        }
        
    }

`;

const StyledSearchBarWrapper = styled.div`
    flex: 1 1 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin-top: 0.8em;
    box-shadow: 4px -4px 13px 1px rgba(0,0,0, 0.2),
                -2px 3px 19px 1px rgba(0,0,0, 0.2);
    padding: 1em 1.5em;
    border-radius: 10px;
    border: 1px solid rgba(0,0,0, 0.2);
    background-color: rgba(255, 255, 255, 0.97);
 
    & > form {
        flex: 0 1 100%;
        display: flex;
        flex-flow: row wrap;
    }

    @media (min-width: 768px) {
        & > form {
            font-size: 0.8em;
        }
    }
`;
