const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type User {
        _id: ID
        firstName: String
        lastName: String
        userName: String
        email: String
        password: String
        contacts: [Contact]!
        reminders: [Reminder]!
    }

    type Contact {
        _id: ID
        firstName: String
        lastName: String
        email: String
        phoneNumber: String
        contactofUser: String
    }

    type Reminder {
        _id: ID
        contact: Contact
        contactType: String
        date: String
        message: String
        reminderOfUser: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(_id: ID!): User
        contacts: [Contact]
        reminders: [Reminder]
        userContacts(userName: String!): [Contact] 
        userReminders(userName: String!): [Reminder] 
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, userName: String!, email: String!, password:String!): Auth 
        login(email: String!, password: String!): Auth
        addContact(
            firstName: String!, 
            lastName: String!, 
            email: String!, 
            phoneNumber: String!, 
            contactOfUser: String!
            ): Contact
        addReminder(
            contact: ID!, 
            contactType: String!, 
            date: String!, 
            message: String!, 
            reminderOfUser: String!
            ): Reminder
        updateReminder(
            reminderId: ID!,
            date: String,
            message: String
        ): Reminder
        removeContact(contactId: ID!): Contact
        removeReminder(reminderId: ID!): Reminder
    }
`

module.exports = typeDefs