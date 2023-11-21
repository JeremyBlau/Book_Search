const User = require("../models/User"); // Import your User model

const resolvers = {
  Query: {
    // Resolver for getting a user by ID
    getUser: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        throw new Error('Failed to fetch user');
      }
    },
    // Resolver for getting all users
    getAllUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error('Failed to fetch users');
      }
    },
    // Resolver for getting bookCount of a user
    getUserBookCount: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user.bookCount;
      } catch (err) {
        throw new Error('Failed to fetch user');
      }
    },
  },
  Mutation: {
    // Resolver for adding a new user
    addUser: async (_, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        return user;
      } catch (err) {
        throw new Error('Failed to create user');
      }
    },
    // Resolver for updating user details
    updateUser: async (_, { userId, username, email }) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { username, email },
          { new: true } // To return the updated user
        );
        return updatedUser;
      } catch (err) {
        throw new Error('Failed to update user');
      }
    },
    // Resolver for deleting a user
    deleteUser: async (_, { userId }) => {
      try {
        const deletedUser = await User.findByIdAndDelete(userId);
        return deletedUser;
      } catch (err) {
        throw new Error('Failed to delete user');
      }
    },
  },
};

module.exports = resolvers;
