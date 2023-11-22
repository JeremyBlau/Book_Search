const { User } = require('../models/User');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {}
      throw AuthenticationError
    }
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError('Incorrect password');
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { bookInput }, context) => {
      if (context.user) {
        const { _id } = context.user;
        const updatedUser = await User.findByIdAndUpdate(
          _id,
          { $addToSet: { savedBooks: bookInput } },
          { new: true }
        );

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in to save a book');
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const { _id } = context.user;
        const updatedUser = await User.findByIdAndUpdate(
          _id,
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in to remove a book');
    },
  },
};

module.exports = resolvers;
