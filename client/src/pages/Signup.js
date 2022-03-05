import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
    });
   const [addUser, { error, data }] = useMutation(ADD_USER);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log(formState);
  
      try {
        const { data } = await addUser({
          variables: { ...formState },
        });
  
        Auth.login(data.addUser.token);
      } catch (e) {
        console.error(e);
      }
    };
  
    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                <div className="card">
                    <h4 className="text-light p-2 login-header">Sign Up</h4>
                    <div className="card-body">
                        {data ? (
                            <p>
                                Success! You may now head{' '}
                                <Link to="/">back to the homepage.</Link>
                            </p>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <label for='firstName'>First Name:</label>
                                <input
                                    className="form-input"
                                    placeholder="First Name"
                                    id='firstName'
                                    name="firstName"
                                    type="text"
                                    value={formState.firstName}
                                    onChange={handleChange}
                                />
                                <label for='lastName'>Last Name:</label>
                                <input
                                    className="form-input"
                                    placeholder="Last Name"
                                    id='lastName'
                                    name="lastName"
                                    type="text"
                                    value={formState.lastName}
                                    onChange={handleChange}
                                />
                                <label for='lastName'>Username:</label>
                                <input
                                    className="form-input"
                                    placeholder="Your username"
                                    id='userName'
                                    name="userName"
                                    type="text"
                                    value={formState.userName}
                                    onChange={handleChange}
                                />
                                <label for='email'>Email:</label>
                                <input
                                    className="form-input"
                                    placeholder="Your email"
                                    id='email'
                                    name="email"
                                    type="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                />
                                <label for='email'>Password:</label>
                                <input
                                    className="form-input"
                                    placeholder="******"
                                    id='password'
                                    name="password"
                                    type="password"
                                    value={formState.password}
                                    onChange={handleChange}
                                />
                                <button
                                    className="btn btn-block btn-reverse"
                                    style={{ cursor: 'pointer' }}
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        )}
  
                        {error && (
                            <div className="my-3 p-3 bg-danger text-white">
                            {error.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
  };

  export default Signup