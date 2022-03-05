import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth'

const ReminderList = ({ reminders, title }) => {
    // console.log("reminders", reminders)
   
    if(!Auth.loggedIn() || !reminders.length) {
        return (<h2>No Reminders Yet. Create some to keep in touch with your contacts!</h2>)
    }  

    const imagePicker = (contactType) => {
        if(contactType == 'phone call') {
            return "phone.png"
        }
        else if(contactType == "text") {
            return "text.png"
        }
        return "email.png"
    }

    return (
        <div>
            <h2 className='reminder-list-title'>{title}</h2>
            {reminders &&
                reminders.map((reminder) => (
                    <div className="card card-reminder-list" key={reminder._id}>
                        
                        
                        <h3 className='text-light reminder-header'>{reminder.contactType} - {`${reminder.contact.firstName} ${reminder.contact.lastName}`}</h3>
                        
                        <img src={imagePicker(reminder.contactType)}></img>
                        <p className="reminder-list-p">{reminder.date}</p>
                        <Link to={`/reminders/${reminder._id}`}>
                            <p className='reminder-list-p'>
                                View and Update this Reminder
                            </p>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

export default ReminderList