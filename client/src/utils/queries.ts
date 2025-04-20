import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
query Users {
  users {
    _id
    name
    username
    email
    phone
    age
    roles
  }
}`;
// export const QUERY_USER = gql``;
export const QUERY_POSTS = gql`
query Posts {
  posts {
    _id
    postAuthor
    postText
    comments {
      commentAuthor
      commentText
      createdAt
    }
    createdAt
  }
}`;
// export const QUERY_POST = gql``;
// export const QUERY_ME = gql``;