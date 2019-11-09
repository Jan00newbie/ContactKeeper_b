import React, {useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

import authContext from '../../context/auth/authContext'

const style = {
    display: 'flex',
    padding: '2em',
    background: 'lightblue',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: "0 2px 4px 0 grey",
};  


const Header = () => {
    const {user} = useContext(authContext);

    useEffect(()=>{
        console.log(2);
    },[user])
    
    
    const navItems = user
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
