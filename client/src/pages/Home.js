import React from 'react';
import { useQuery } from '@apollo/client';
import ReminderForm from '../components/ReminderForm';
import ReminderList from '../components/ReminderList';

import { QUERY_USER_CONTACTS, QUERY_USER_REMINDERS, QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth'



const Home = () => {
  

    let user
    if(Auth.loggedIn()) {
        user = Auth.getProfile().data.userName
    }
    //if nobody is logged in doing Ath.getProfile()... breaks the page so it must be in conditional to render at all times 
    
    //this must be named "data"
    //loading, data, and err are keywords
    const { loading, data } = useQuery(QUERY_USER_CONTACTS, {
        variables: { userName: user }
    })
    const contacts = data?.userContacts || []
    //you cannot do data.userContacts but the data?.userContacts syntax works for whatever reason


    //if more than 1 query on a page have to do "data:reminderData"
    const { loading: remindersLoading, data: remindersData } = useQuery(QUERY_USER_REMINDERS, {
        variables: {userName: user}
    })
    const reminders = remindersData?.userReminders || []
    console.log("remindersData", reminders)

    // let myUser



    // if(Auth.loggedIn()) {
    //     const { loading: userLoading, data: userData } = useQuery(QUERY_USER, {
    //         variables: {_id: Auth.getProfile().data._id}
    //     })
    //     myUser = userData?.user || []
    //     console.log("userData", myUser)
    // }
    
    return (
        <main>
            
            <div>
                <ReminderForm contacts={contacts} user={user}/>
            </div>
            <div>
                <ReminderList reminders={reminders} title="Upcoming Reminders"/>
            </div>
        </main>
    )
}

export default Home