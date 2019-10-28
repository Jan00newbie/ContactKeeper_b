import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../Navbar/Navbar'
import logo from '../../../assets/logo.svg'

const style = {
    display: 'flex',
    padding: '2em',
    background: 'lightblue',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: "0 2px 4px 0 grey",
};  


const Header = () => {
    return (
        <header style={style}>
            <Link to="/">
                <img id="logo" src={logo} alt="logo"/>Contact Keeper
            </Link>
            
            <Navbar />
        </header>
    )
}

export default Header
