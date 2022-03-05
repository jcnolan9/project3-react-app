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

    console.log("reminder object", reminder)
    console.log("reminder name", reminder.contact.firstName)
    console.log("reminder message", reminder.message)

    //if stops working comment out stuff in return, reminder name console log, and reminder message console log
    //keep reminder object. then re-enable all those things

    return (
        <div>
            <h2>{reminder.contactType} {reminder.contact.firstName} {reminder.contact.lastName}</h2>
            <p>at</p>
            <p>{reminder.date}</p>
            <p>Message:</p>
            <p>{reminder.message}</p>
        </div>
        // <>
        // </>
    )
}

export default SingleReminder