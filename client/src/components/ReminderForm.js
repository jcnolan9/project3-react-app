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
                <>
                    <h2>Create Reminder</h2>

                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <label for="contactList">Contact:</label>
                            <select name="contact" id="contactList" value={reminderContact} onChange={handleChange}>
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
                            
                            
                            <input type="radio" id="text" name="contactType" value="text" onChange={handleChange} />
                            <label for="text">Text</label>
                            
                            <input type="radio" id="email" name="contactType" value="email" onChange={handleChange}/>
                            <label for="email">Email</label>
                            
                            <input type="radio" id="phone" name="contactType" value="phone" onChange={handleChange}/>
                            <label for="text">Phone Call</label>
                            <br></br>

                            <label for="reminder-date">Date:</label>
                            <input type="text" name='date' id="reminder-date" value={reminderDate} onChange={handleChange}></input>
                            <br></br>

                            <label for="message">Message:</label><br></br>
                            <textarea name="message"
                                id="message" 
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