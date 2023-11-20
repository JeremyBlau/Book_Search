const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    getUser(userId: ID!): User
    getAllUsers: [User]
    getUserBookCount(userId: ID!): Int
    # Add more queries as needed...
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    updateUser(userId: ID!, username: String!, email: String!): User
    deleteUser(userId: ID!): User
    # Add more mutations as needed...
  }
`;

module.exports = typeDefs;
