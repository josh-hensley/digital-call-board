const typeDefs = `
type User {
    _id: ID
    name: String
    email: String
    password: String
    phone: String
    age: Int
    roles: [String]
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

input UserInput {
    _id: ID!
    name: String,
    email: String,
    phone: String,
    age: Int,
    roles: [String] 
}

input NewUser {
    name: String,
    email: String,
    phone: String,
    age: Int,
    password: String,
    roles: [String]
}

input DeleteUser {
    _id: ID!
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
    user(search: String!): User
    reports: [Report]
    report(date: String!): Report
    posts: [Post]
    post(postId: ID!): Post
    me: User
}

type Mutation {
    addUser(input: NewUser): User
    updateUser(input: UserInput): User
    deleteUser(input: DeleteUser): User
    login(email: String!, password: String!): Auth
    addPost(input: PostInput!): Post
    addReport(input: ReportInput!): Report
    removeReport(reportId: ID!): Report
    removePost(postId: ID!): Post
    addComment(postId: ID!, commentText: String!, commentAuthor: String!): Post
    removeComment(postId: ID!, commentId: ID!): Post
    updatePassword(newPassword: String!): Auth
}
`;

export default typeDefs;