import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
  }
}`;
export const CHANGE_PASSWORD = gql`
mutation UpdatePassword($newPassword: String!) {
  updatePassword(newPassword: $newPassword) {
    token
  }
}
`
// export const ADD_USER = gql``;
export const ADD_POST = gql`
mutation AddPost($input: PostInput!) {
  addPost(input: $input) {
    postAuthor
    postText
    createdAt
    _id
  }
}`;
// export const ADD_COMMENT = gql``;
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
`