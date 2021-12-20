const { gql } = require('apollo-server-core');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  input UserInput {
    name: String!
    email: String!
  }

  type Board {
    id: ID!
    name: String!
    owner: User!
    posts: [Post!]!
  }

  input BoardInput {
    ownerId: ID!
    name: String!
  }

  type Post {
    id: ID!
    author: User!
    board: Board!
    text: String!
  }

  input PostInput {
    authorId: ID!
    boardId: ID!
    text: String!
  }

  type Query {
    user(id: ID!): User
    users: [User!]!
    boards: [Board!]!
  }

  type Mutation {
    createUser(userInput: UserInput!): User!
    createPost(postInput: PostInput!): Post!
  }

  type Subscription {
    newPost(boardId: ID!): Post!
  }
`;

module.exports = typeDefs;