import { gql } from '@apollo/client';

export const QUERY_USER_REMINDERS = gql`
  query userReminders($username: String!) {
    userReminders(username: $username) {
      _id
      contact {
        _id
        firstName
        LastName
      }
      contactType
      date
      message
    }
  }
`;

export const QUERY_USER_CONTACTS = gql`
  query userContacts {
    contacts {
      _id
      firstName
      lastName
    }
  }
`;
