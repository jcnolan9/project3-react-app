import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_CONTACT } from '../utils/mutations';
import Auth from '../utils/auth';

const ContactForm = ({ user1 }) => {

   console.log("contact form user:", user1)
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        contactOfUser: user1 
      });
     const [addContact, { error, data }] = useMutation(ADD_CONTACT);
    
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
          const { data } = await addContact({
            variables: { ...formState },
          });
          
          setFormState({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: ''
        })
        } catch (e) {
          console.error(e);
        }
      };
    
      return (
          <div>
              {Auth.loggedIn() ?
                     
                         <div className="card">
                             <h4 className="text-light p-2 contact-header reminder-form-card-header">Create Contact</h4>
                             <div className="card-body">
                                     <form onSubmit={handleFormSubmit}>
                                         <label for='firstName'>First Name:</label>
                                         <input
                                             className="reminder-form-input"
                                             placeholder="First Name"
                                             id='firstName'
                                             name="firstName"
                                             type="text"
                                             value={formState.firstName}
                                             onChange={handleChange}
                                         />
                                         <br></br>
                                         <label for='lastName'>Last Name:</label>
                                         <input
                                             className="reminder-form-input"
                                             placeholder="Last Name"
                                             id='lastName'
                                             name="lastName"
                                             type="text"
                                             value={formState.lastName}
                                             onChange={handleChange}
                                         />
                                         <br></br>
                                         <label for='email'>Email:</label>
                                         <input
                                             className="reminder-form-input"
                                             placeholder="Your email"
                                             id='email'
                                             name="email"
                                             type="email"
                                             value={formState.email}
                                             onChange={handleChange}
                                         />
                                         <br></br>
                                         <label for='email'>Phone Number</label>
                                         <input
                                             className="reminder-form-input"
                                             placeholder="******"
                                             id='phoneNumber'
                                             name="phoneNumber"
                                             type="text"
                                             value={formState.password}
                                             onChange={handleChange}
                                         />
                                         <br></br>
                                         <button
                                             className="btn btn-reverse btn-reminder"
                                             style={{ cursor: 'pointer' }}
                                             type="submit"
                                         >
                                             Submit
                                         </button>
                                     </form>
                                 
           
                                 {error && (
                                     <div className="my-3 p-3 bg-danger text-white">
                                     {error.message}
                                     </div>
                                 )}
                             </div>
                         </div>
                    
                
                : (
                    <div>
                    </div>
                )}
          </div>
       
         
)}

export default ContactForm