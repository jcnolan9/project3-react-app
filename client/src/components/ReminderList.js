import React from 'react';
import { Link } from 'react-router-dom';

const ReminderList = ({ reminders, title }) => {
    if(!reminders.length) {
        return (<h2>No Reminders Yet. Create some to keep in touch with your contacts!</h2>)
    }

    return (
        <div>
            <h2>{title}</h2>
            {reminders &&
                reminders.map((reminder) => (
                    <div key={reminder._id}>
                        <h3>{reminder.contactType} {`${reminder.firstName} ${reminder.lastName}`}</h3>
                        <p>at</p>
                        <p>{reminder.date}</p>
                        <Link to={`/reminders/${reminder.id}`}>
                            View and Update this Reminder
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

export default ReminderList