import React from 'react'
import styled from 'styled-components'
import { SearchBar } from '../searchBar/SearchBar';

export const Navbar = ({ search, setSearch }) => {
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
    flex: 0 1 100%;
    padding: 0;
    & ul {
        list-style-type: none;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        font-size: 1.2em;
    }
    & li {
        flex: 1 0 auto;
        text-align: center;
    }
    & li > a {
        display: none;
    }
    & li:nth-child(2) {
        flex: 0 1 92%;
    }
`;
