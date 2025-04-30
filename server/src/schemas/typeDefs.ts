const typeDefs = `
type User {
    _id: ID
    name: String
    username: String
    email: String
    password: String
    phone: String
    age: Int
    roles: [String]
    posts: [Post]
}

type Post {
    _id: ID
    postText: String
    postAuthor: String
    createdAt: String
    comments: [Comment]
}

input PostInput {
    postText: String!
    postAuthor: String!
}

type Comment {
    commentText: String
    commentAuthor: String
    createdAt: String
}

type Auth {
    token: ID!
  }

type Query {
    users: [User]
    user(username: String!): User
    posts: [Post]
    post(postId: ID!): Post
    me: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addPost(input: PostInput!): Post
    removePost(postId: ID!): Post
    addComment(postId: ID!, commentText: String!, commentAuthor: String!): Post
    removeComment(postId: ID!, commentId: ID!): Post
    updatePassword(newPassword: String!): Auth
}
`;

export default typeDefs;