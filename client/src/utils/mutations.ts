import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;

export const UPDATE_USER = gql`
mutation UpdateUser($input: UserInput) {
  updateUser(input: $input) {
    _id
    age
    email
    name
    phone
    roles
  }
}
`;

export const CHANGE_PASSWORD = gql`
mutation UpdatePassword($newPassword: String!) {
  updatePassword(newPassword: $newPassword) {
    token
  }
}
`;
export const ADD_USER = gql`
mutation AddUser($input: NewUser) {
  addUser(input: $input) {
    _id
    age
    email
    name
    phone
    roles
  }
}
`;
export const ADD_POST = gql`
mutation AddPost($input: PostInput!) {
  addPost(input: $input) {
    postAuthor
    postText
    createdAt
    _id
  }
}
`;

export const ADD_COMMENT = gql`
mutation AddComment($postId: ID!, $commentText: String!, $commentAuthor: String!) {
  addComment(postId: $postId, commentText: $commentText, commentAuthor: $commentAuthor) {
    _id
    comments {
      commentAuthor
      commentText
      createdAt
    }
    createdAt
    postAuthor
    postText
  }
}
`;

export const ADD_REPORT = gql`
mutation AddReport($input: ReportInput!) {
  addReport(input: $input) {
    attendance
    break1
    break2
    breakLength1
    breakLength2
    costumes
    date
    lights
    properties
    rehearsalEnd
    rehearsalNotes
    rehearsalStart
    rehearsalTime
    scenery
    sound
  }
}
`;