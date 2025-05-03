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

type Report {
    _id: ID
    date: String
    rehearsalStart: String
    break1: String
    breakLength1: String
    break2: String
    breakLength2: String
    rehearsalEnd: String
    rehearsalTime: String
    attendance: [String]
    rehearsalNotes: String
    costumes: String
    lights: String
    properties: String
    sound: String
    scenery: String
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

input ReportInput {
    date: String!
    rehearsalStart: String!
    break1: String
    breakLength1: String
    break2: String
    breakLength2: String
    rehearsalEnd: String!
    rehearsalTime: String!
    attendance: [String]!
    rehearsalNotes: String
    costumes: String
    lights: String
    properties: String
    sound: String
    scenery: String
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
    reports: [Report]
    report(date: String!): Report
    posts: [Post]
    post(postId: ID!): Post
    me: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addPost(input: PostInput!): Post
    addReport(input: ReportInput!): Report
    removePost(postId: ID!): Post
    addComment(postId: ID!, commentText: String!, commentAuthor: String!): Post
    removeComment(postId: ID!, commentId: ID!): Post
    updatePassword(newPassword: String!): Auth
}
`;

export default typeDefs;