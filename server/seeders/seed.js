const db = require('../config/connection')
const { User, Contact, Reminder } = require('../models')
const userSeeds = require('./userSeeds.json')
const contactSeeds = require('./contactSeeds.json')
const reminderSeeds =require('./reminderSeeds.json')

db.once('open', async () => {
    try {
        await User.deleteMany({})
        await Contact.deleteMany({})
        await Reminder.deleteMany({})

        await User.create(userSeeds)

        for(let i=0; i<contactSeeds.length; i++) {
            const { _id, contactOfUser } = await Contact.create(contactSeeds[i])
            console.log('COntact of user!! in seeds', contactOfUser)
            try {

            
            const user = await User.findOneAndUpdate(
                { userName: contactOfUser },
                {
                    $addToSet: {
                        contacts: _id
                    }
                }
            )

            } catch(err) {
                console.log('ERRRR in seeds', err)
            }
         //   console.log('USER after we added the id!! ', user)

        }


        for(let i=0; i<reminderSeeds.length; i++) {
            const contact = await Contact.findOne( { contactOfUser: reminderSeeds[i].reminderOfUser })
            console.log(contact._id)
            const newReminder = { ...reminderSeeds[i], contact: contact._id}
            console.log(newReminder)
            const { _id, reminderOfUser } = await Reminder.create(newReminder)
            const user = await User.findOneAndUpdate(
                { userName: reminderOfUser },
                {
                    $addToSet: {
                        reminders: _id
                    }
                }
            )
        }

    } catch (err) {
        console.error(err)
        process.exit(1)
    }

    console.log('database seeded successfully')
    process.exit(0)
})