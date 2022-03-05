import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_REMINDER } from '../utils/queries';


const SingleReminder = () => {
    const { reminderId } = useParams()

    console.log("reminderId", reminderId)

    const { loading, data } = useQuery(QUERY_REMINDER, {
        variables: {
            _id: reminderId
         }
    })

    console.log("data", data)
    const reminder = data?.reminders || {}

    const imagePicker = (contactType) => {
        if(contactType == 'phone call') {
            return "phone.png"
        }
        else if(contactType == "text") {
            return "text.png"
        }
        return "email.png"
    }

    //all I had to do was add this to stop the app the from breaking and showing nothing when hitting the back button
    if (loading) {
        return <div>Loading...</div>;
    }

    // console.log("reminder object", reminder)
    // console.log("reminder name", reminder.contact.firstName)
    // console.log("reminder message", reminder.message)

    //if stops working comment out stuff in return, reminder name console log, and reminder message console log
    //keep reminder object. then re-enable all those things

    return (
        <div className='card card-reminder-list'>
            <h2 className='text-light reminder-header'>{reminder.contactType} {reminder.contact.firstName} {reminder.contact.lastName}</h2>
            
            <img src={imagePicker(reminder.contactType)}></img>
            <p className='reminder-list-p'>{reminder.date}</p>
            <p className='reminder-list-p message'>Message:</p>
            <p className='reminder-list-p'>{reminder.message}</p>
        </div>
        // <>
        // </>
    )
}

export default SingleReminder