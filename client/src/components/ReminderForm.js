import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_REMINDER } from '../utils/mutations';
import Auth from '../utils/auth';

const ReminderForm = ({ contacts }) => {

    const [reminderContact, setReminderContact] = useState('')
    const [reminderContactType, setReminderContactType] = useState('')
    const [reminderDate, setReminderDate] = useState(Date.now().toLocaleString('en-US'))
    const [reminderMessage, setReminderMessage] = useState('')

    const [addReminder, { error }] = useMutation(ADD_REMINDER)
    
    const handleFormSubmit = async (event) => {
        event.preventDefault()

        try {
            const { data } = await addReminder({
                variables: {
                    contact: reminderContact,
                    contactType: reminderContactType,
                    date: reminderDate,
                    message: reminderMessage,
                    reminderOfUser: Auth.getProfile().data.username
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
    }

    return (
        <div>
            {Auth.loggedIn() ?
                <>
                    <h2>Create Reminder</h2>

                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <label for="contactList">Contact:</label>
                            <select name="contacts" id="contactList" value={reminderContact} onChange={handleChange}>
                                {
                                    contacts.map((userContact) => (
                                        <option key={userContact._id} value={userContact._id}>
                                            {`${userContact.firstName} ${userContact.lastName}`}
                                        </option>
                                    ))
                                }
                            </select>
                            
                            <label for="text">Text</label>
                            <input type="radio" id="text" name="contactType" value="text" onChange={handleChange} />
                            <label for="email">Email</label>
                            <input type="radio" id="email" name="contactType" value="email" onChange={handleChange}/>
                            <label for="text">Phone Call</label>
                            <input type="radio" id="phone" name="contactType" value="phone" onChange={handleChange}/>


                            <label for="reminder-date">Date:</label>
                            <input type="text" name='date' id="reminder-date"></input>

                            <textarea name="message" 
                                placeholder="What do want to talk about..." 
                                value={reminderMessage}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        
                        <button type='submit'>Create Reminder</button>

                        {error && (
                            <div className="col-12 my-3 bg-danger text-white p-3">
                                 {error.message}
                            </div>
                        )}
                    </form>
                </>
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