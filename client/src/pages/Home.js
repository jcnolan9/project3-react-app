import React from 'react';
import { useQuery } from '@apollo/client';
import ReminderForm from '../components/ReminderForm';
import ReminderList from '../components/ReminderList';

import { QUERY_USER_CONTACTS, QUERY_USER_REMINDERS } from '../utils/queries';



const Home = () => {
    const { contactsData } = useQuery(QUERY_USER_CONTACTS)
    const contacts = contactsData?.contacts || []

    const { remindersData } = useQuery(QUERY_USER_REMINDERS)
    const reminders = remindersData?.reminders || []

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