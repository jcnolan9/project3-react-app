import { gql } from '@apollo/client';

export const QUERY_USER_REMINDERS = gql`
  query userReminders($userName: String!) {
    userReminders(userName: $userName) {
      _id
      contact {
        _id
        firstName
        lastName
      }
      contactType
      date
      message
    }
  }
`;

export const QUERY_USER_CONTACTS = gql`
  query userContacts($userName: String!) {
    userContacts (userName: $userName) {
        _id
        firstName
        lastName
    }
  }
`;

export const QUERY_USER = gql`
  query user($_id: ID!) {
      user (_id: $_id) {
          userName
      }
  }
`;

export const QUERY_REMINDER =gql`
  query reminders($_id: ID!) {
      reminders(_id: $_id) {
        contact {
            _id
            firstName
            lastName
          }
        contactType
        date
        message
        reminderOfUser
    }
  }
`;