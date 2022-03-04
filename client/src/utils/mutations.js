import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        userName
      }
    }
  }
`;

export const ADD_REMINDER = gql`
mutation addReminder($contact: ID!, $contactType: String!, $date: String!, $message: String!, $reminderOfUser: String!) {
    addReminder(contact: $contact, contactType: $contactType, date: $date, message: $message, reminderOfUser: $reminderOfUser) {
      _id
      contact {
          firstName
          lastName
      }
      message
      reminderOfUser
    }
  }
`;

// export const ADD_CONTACT = gql`
//   mutation addThought($thoughtText: String!, $thoughtAuthor: String!) {
//     addThought(thoughtText: $thoughtText, thoughtAuthor: $thoughtAuthor) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//       }
//     }
//   }
// `;

export const ADD_USER = gql`
    mutation addUser($firstName: String!, $lastName: String!,  $userName: String!, $email: String!, $password: String!) {
        addUser(firstName: $firstName, lastName: $lastName, userName: $userName, email: $email, password: $password) {
         token
         user {
         _id
         userName
      }
    }
  }
`;