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
