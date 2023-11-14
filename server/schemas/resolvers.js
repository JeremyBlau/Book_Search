const { User } = require('./models');

const resolvers = {
  Query: {
    me: (parent, args, context) => {
      // Logic to fetch current user
    },
  },
  Mutation: {
    login: async (parent, { email, password }, context) => {
      // Logic to handle user login
    },
    addUser: async (parent, { username, email, password }, context) => {
      // Logic to add a new user
    },
    saveBook: async (parent, { bookInput }, context) => {
      // Logic to save a book for a user
    },
    removeBook: async (parent, { bookId }, context) => {
      // Logic to remove a book from a user's saved books
    },
  },
};

module.exports = resolvers;
