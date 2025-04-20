const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [Post]
}

type Post {
    _id: ID
    postText: String
    postAuthor: String
    createdAt: String
    comments: [Comment]
}

type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
}

type Query {
    users: [User]
    user(username: String!): User
    posts: [Post]
    post(postId: ID!): Post
    me: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    login(username: String!, password: String!): User
    addPost(postText: String!, postAuthor: String!): Post
    removePost(postId: ID!): Post
    addComment(postId: ID!, commentText: String!, commentAuthor: String!): Post
    removeComment(postId: ID!, commentId: ID!): Post
}
`;

export default typeDefs;