import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
query Users {
  users {
    _id
    name
    email
    phone
    age
    roles
  }
}`;

export const QUERY_USER = gql`
query User($search: String!) {
  user(search: $search) {
    _id
    age
    email
    name
    password
    phone
    roles
    username
  }
}
`

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

export const QUERY_REPORTS = gql`
query Reports {
  reports {
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
    _id
  }
}
`