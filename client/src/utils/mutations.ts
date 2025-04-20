import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
  }
}`;
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