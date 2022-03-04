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
        <header>
            <div>
                Keep In Touch
            </div>
            <div>
                {Auth.loggedIn() ? (
                    <>
                       <p>Welcome {Auth.getProfile().data.userName}</p> 
                       <button onClick={logout}>Logout</button>
                    </>
                    ) : (
                    <>
                        <Link to='/login'>
                            <button>Login</button>
                        </Link>
                        <Link to='/signup'>
                            <button>Signup</button>
                        </Link>
                    </>
                    )
                }
            </div>
        </header>
    )
}

export default Header

