const { User } = require('../models/');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthService = require('../path_to_your_AuthService_file');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new Error('Authentication error. Please log in.');
      }
      return await User.findById(context.user._id);
    },
  },
  Mutation: {
    login: async (parent, { email, password }, context) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('Invalid credentials');
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw new Error('Invalid credentials');
      }

      // Create JWT token for authentication
      const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

      // Store the token in localStorage using your AuthService
      AuthService.login(token);

      return user;
    },
    addUser: async (parent, { username, email, password }, context) => {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      // Create JWT token for the new user upon successful registration
      const token = jwt.sign({ userId: newUser._id }, 'your_secret_key', { expiresIn: '1h' });

      // Store the token in localStorage using your AuthService
      AuthService.login(token);

      return newUser;
    },
    saveBook: async (parent, { bookInput }, context) => {
      if (!context.user) {
        throw new Error('Authentication error. Please log in.');
      }

      const user = await User.findByIdAndUpdate(
        context.user._id,
        { $push: { savedBooks: bookInput } },
        { new: true }
      );

      return user;
    },
    removeBook: async (parent, { bookId }, context) => {
      if (!context.user) {
        throw new Error('Authentication error. Please log in.');
      }

      const user = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );

      return user;
    },
  },
};

module.exports = resolvers;
