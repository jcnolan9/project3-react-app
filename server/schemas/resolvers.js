const { AuthenticationError } = require('apollo-server-express');
const { User, Contact, Reminder } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('contacts').populate('reminders')
        },
        contacts: async () => {
            return Contact.find()
        },
        reminders: async () => {
            return Reminder.find()
        },
        userContacts: async (parent, { userName }) => {
            return User.findOne({ userName }).populate('contacts')
        },
        userReminders: async(parent, { userName }) => {
            return User.findOne({ userName }).populate('reminders')
        }
    },

    Mutation: {
        addUser: async (parent, { firstName, lastName, userName, email, password }) => {
            const user = await User.create({ firstName, lastName, userName, email, password })
            const token = signToken(user)
            return { token, user }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email })

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
              }
        
              const correctPw = await user.isCorrectPassword(password);
        
              if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
              }
        
              const token = signToken(user);
        
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
        removeContact: async (parent, { contactId }) => {
            return Thought.findOneAndDelete({ _id: contactId })
        },
        removeReminder: async (parent, { reminderId }) => {
            return Reminder.findOneAndDelete({ _id: reminderId })
        }
    }
}

module.exports = resolvers