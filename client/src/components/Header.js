import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    }

    //   console.log("username", Auth.getProfile().data.userName)
    

    return (
        <header className="bg-header text-light mb-4 py-3 flex-row align-center">
            <div className="container flex-row justify-space-between align-center">
                <div className='header-title'>
                    Keep In Touch 
                </div>
                <div className='container flex-row justify-flex-end align-start'>
                    {Auth.loggedIn() ? (
                        <>
                        <p>Welcome {Auth.getProfile().data.userName}</p> 
                        <button className='btn' onClick={logout}>Logout</button>
                        </>
                        ) : (
                        <>
                            <Link to='/login'>
                                <button className='btn'>Login</button>
                            </Link>
                            <Link to='/signup'>
                                <button className='btn'>Signup</button>
                            </Link>
                        </>
                        )
                    }
                </div>
            </div>
            
        </header>
    )
}

export default Header

