import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.svg'

import authContext from '../../../context/auth/authContext'

const style = {
    display: 'flex',
    padding: '2em',
    background: 'lightblue',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: "0 2px 4px 0 grey",
};  


const Header = () => {
    const {isAuthenticated, user} = useContext(authContext);
    
    const navItems = isAuthenticated
        ?['about', 'contacts'] 
        :['about', 'login', 'register', 'contacts'];

    const userElement = user
        ? <h2>Hello {user.name}</h2>
        :'';
    

    return (
        <header style={style}>
            <Link to="/">
                <img id="logo" src={logo} alt="logo"/>Contact Keeper
            </Link>
            {userElement}
            <nav style={{width:'250px'}}>
                <ul>
                    {navItems.map(link => (
                        <li key={link}>
                            <Link to={`/${link}`}>{link}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}

export default Header
