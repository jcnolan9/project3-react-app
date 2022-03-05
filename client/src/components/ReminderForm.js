import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

 import { ADD_REMINDER } from '../utils/mutations';
import Auth from '../utils/auth';

const ReminderForm = ({ contacts, user }) => {

    console.log("MyUser:", user)

    const [reminderContact, setReminderContact] = useState('')
    const [reminderContactType, setReminderContactType] = useState('')
    const [reminderDate, setReminderDate] = useState(Date.now())
    const [reminderMessage, setReminderMessage] = useState('')

    const [addReminder, { error, data }] = useMutation(ADD_REMINDER)


    // console.log("Logged In:", Auth.getProfile().data.username)
    
    const handleFormSubmit = async (event) => {
        event.preventDefault()

        try {
            const { data } = await addReminder({
                variables: {
                    contact: reminderContact,
                    contactType: reminderContactType,
                    date: reminderDate,
                    message: reminderMessage,
                    reminderOfUser: user
                }
            })

            setReminderContact('')
            setReminderContactType('')
            setReminderDate(Date.now().toLocaleString('en-US'))
            setReminderMessage('')
        } catch (err) {
            console.error(err)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        switch(name) {
            case "contact":
                setReminderContact(value)
                break
            case "contactType":
                setReminderContactType(value)
                break
            case "date":
                setReminderDate(value)
                break
            case "message":
                setReminderMessage(value)
                break
        }
        console.log("contact", {
            contact: reminderContact,
            contactType: reminderContactType,
            date: reminderDate,
            message: reminderMessage,
            reminderOfUser: user
        })
    }

    //if there is only 1 option in the select tag below the onChange for whatever reason never registers
    //adding a blank tag as the first option and forcing the user to switch the mapped option below fixes the issue

    return (
        <div>
           
            {Auth.loggedIn() ?
                <div className='card'>
               
                    <h2 className='login-header text-light reminder-form-card-header'>Create Reminder</h2>

                    <form onSubmit={handleFormSubmit}>
                        <div className='container '>
                            
                                <label  for="contactList">Contact Name:</label>
                                <select className='reminder-form-input' name="contact" id="contactList" value={reminderContact} onChange={handleChange}>
                                    <option key="0" value=""></option>
                                    {
                                        contacts.map((userContact) => (
                                            <option key={userContact._id} value={userContact._id}>
                                                {`${userContact.firstName} ${userContact.lastName}`}
                                            </option>
                                        ))
                                    }
                                </select>
                           
                            
                            <br></br>
                            
                            <label>
                                How to Reach:
                                <input className='reminder-form-input-radio' type="radio" id="text" name="contactType" value="text" onChange={handleChange} />
                                <label for="text">Text</label>
                                
                                <input className='reminder-form-input-radio' type="radio" id="email" name="contactType" value="email" onChange={handleChange}/>
                                <label for="email">Email</label>
                                
                                <input className='reminder-form-input-radio' type="radio" id="phone" name="contactType" value="phone" onChange={handleChange}/>
                                <label for="text">Phone Call</label>
                            </label>

                            <br></br>
                            <label className='' for="reminder-date">Date:</label>
                            <input className='reminder-form-input' type="text" name='date' id="reminder-date" value={reminderDate} onChange={handleChange}></input>
                            
                            <br></br>

                            <label for="message">Message:</label><br></br>
                            <textarea className='reminder-form-message' name="message"
                                id="message" 
                                placeholder="What do want to talk about..." 
                                value={reminderMessage}
                                onChange={handleChange}
                            ></textarea>
                        
                            <br></br>
                            
                        </div>

                        <button className='btn btn-reverse btn-reminder' type='submit'>Create Reminder</button>

                        {error && (
                            <div className="col-12 my-3 bg-danger text-white p-3">
                                 {error.message}
                            </div>
                        )}
                    </form>
                </div>
            : (
                <p>
                    Please sign in to create a reminder. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">singup.</Link>
                </p>
            )}
        </div>
    )
}

export default ReminderForm