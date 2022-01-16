import React from 'react'
import styled from 'styled-components'
import { SearchBar } from '../searchBar/SearchBar';

export const Navbar = () => {
    return (
        <>
            <Nav>
                <ul>
                    <li>
                        <a href="/">Main</a>
                    </li>
                    <li>
                        <SearchBar />
                    </li>
                    <li>
                        <a href="/contact">Contact</a>
                    </li>

                </ul>
            </Nav>
        </>
    )
}
const Nav = styled.nav`
    with: 100%;
    height: 15vh;
    padding: 0;
    margin-top: 0px
    display: flex;
    justify-content: space-around;
    padding: 20px;

    & ul {
        list-style: none;
        display: flex;
        justify-content: space-around;
        font-size: 1.2em;
    }

    & li {
        flex: 1 1 33%;
        text-align: center;
    }
`;
