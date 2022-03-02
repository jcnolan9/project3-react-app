import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_REMINDER = gql`
  mutation addReminder($contact: ID!, $contactType: String!, $date: String!, $message: String!, $reminderOfUser: String!) {
    addReminder(contact: $contact, $contactType: contactType, date: $date, message: $message, reminderOfUser: $reminderOfUser) {
      _id
      contact {
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

export const ADD_CONTACT = gql`
  mutation addThought($thoughtText: String!, $thoughtAuthor: String!) {
    addThought(thoughtText: $thoughtText, thoughtAuthor: $thoughtAuthor) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;