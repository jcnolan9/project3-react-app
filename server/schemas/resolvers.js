const { AuthenticationError } = require('apollo-server-express');
const { User, Contact, Reminder } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('contacts').populate({
                path: "reminders", // populate blogs
                populate: {
                   path: "contact" // in blogs, populate comments
                }
             })
        },
        user: async (parent, { _id }) => {
            return User.findOne({ _id }).populate('contacts').populate({
                path: 'reminders',
                populate: {
                    path: 'contact'
                }
            })
        }, 
        contacts: async () => {
            return Contact.find()
        },
        reminders: async () => {
            return Reminder.find().populate('contact')
        },
        userContacts: async (parent, { userName }) => {
            console.log()
            return Contact.find({ contactOfUser: userName })

            // const { contacts } = await User.findOne({ userName }).populate('contacts').populate({
            //     path: 'reminders',
            //     populate: {
            //         path: 'contact'
            //     }
            // })

            // console.log('COntacts!!', contacts)
            // return contacts
        },
        userReminders: async(parent, { userName }) => {

            // console.log("REMINDERS!!!", Reminder.find({ reminderOfUser: userName }).populate('contact'))
            return Reminder.find({ reminderOfUser: userName }).populate('contact')
            
            

            // console.log(userName)
            // const { reminders } = await User.findOne({ userName }).populate({
            //     path: 'reminders',
            //     populate: {
            //         path: 'contact'
            //     }
            // })
            
            // console.log("REMINDERS", reminders)
            // return reminders
        }
    },

    Mutation: {
        addUser: async (parent, { firstName, lastName, userName, email, password }) => {
            const user = await User.create({ firstName, lastName, userName, email, password })
            const token = signToken(user)
            return { token, user }
        },
        login: async (parent, { email, password }) => {
            console.log("HIT SERVERRRRRR")
            const user = await User.findOne({ email })

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
              }
        
              const correctPw = await user.isCorrectPassword(password);
        
              if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
              }
        
              const token = signToken(user);

              console.log(token)
        
              return { token, user };
        },
        addContact: async (parent, { firstName, lastName, email, phoneNumber, contactOfUser}) => {
            const contact = await Contact.create({ firstName, lastName, email, phoneNumber, contactOfUser })

            await User.findOneAndUpdate(
                { username: contactOfUser},
                { $addToSet: { contacts: contact._id }}
            )

            return contact
        },
        addReminder: async (parent, { contact, contactType, date, message, reminderOfUser }) => {
            const reminder = await Reminder.create({ contact, contactType, date, message, reminderOfUser })

            await User.findOneAndUpdate(
                { username: reminderOfUser},
                { $addToSet: { reminders: reminder._id }}
            )

            return reminder
        },
        updateReminder: async(parent, { reminderId, date, message }) => {
            await Reminder.findOneAndUpdate(
                { _id: reminderId },
                { date: date, message: message }
            )
        },
        removeContact: async (parent, { contactId }) => {
            return Thought.findOneAndDelete({ _id: contactId })
        },
        removeReminder: async (parent, { reminderId }) => {
            return Reminder.findOneAndDelete({ _id: reminderId })
        }
    }
}

module.exports = resolvers