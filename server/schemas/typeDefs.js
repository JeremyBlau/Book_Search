const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
    bookCount: Int
  }

  type Query {
    me: User
  }

  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Mutation {
    login(email: String!, password: String!): User
    addUser(username: String!, email: String!, password: String!): User
    saveBook(bookInput: BookInput!): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
