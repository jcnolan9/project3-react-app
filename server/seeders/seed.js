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
            const user = await User.findOneAndUpdate(
                { username: contactOfUser },
                {
                    $addToSet: {
                        contacts: _id
                    }
                }
            )
        }

        for(let i=0; i<reminderSeeds.length; i++) {
            const { _id, reminderOfUser } = await Reminder.create(reminderSeeds[i])
            const user = await User.findOneAndUpdate(
                { username: reminderOfUser },
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