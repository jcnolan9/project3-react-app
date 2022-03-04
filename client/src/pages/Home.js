import React from 'react';
import { useQuery } from '@apollo/client';
import ReminderForm from '../components/ReminderForm';
import ReminderList from '../components/ReminderList';

import { QUERY_USER_CONTACTS, QUERY_USER_REMINDERS } from '../utils/queries';
import Auth from '../utils/auth'



const Home = () => {
    //this must be named "data"
    //loading, data, and err are keywords
    const { loading, data } = useQuery(QUERY_USER_CONTACTS, {
        variables: { userName: "dknuth" }
    })
    const contacts = data?.userContacts || []
    //you cannot do data.userContacts but the data?.userContacts syntax works for whatever reason

    // console.log("contacts Home", data)
    // console.log(contacts)
    // console.log('Loading', loading)
    // console.log('err', err)

    //if more than 1 query on a page have to do "data:reminderData"
    const { loading: remindersLoading, data: remindersData } = useQuery(QUERY_USER_REMINDERS, {
        variables: {userName: "dknuth"}
    })

    // console.log("reminderData", data)
    const reminders = remindersData?.userReminders || []
    console.log("remindersData", reminders)

    return (
        <main>
            
            <div>
                <ReminderForm contacts={contacts}/>
            </div>
            <div>
                <ReminderList reminders={reminders} title="Upcoming Reminders"/>
            </div>
        </main>
    )
}

export default Home