const { User } = require('../models/');
const bcrypt = require('bcrypt');

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

      // Create JWT token or set session for authentication
      // Example with JWT:
      // const token = createToken(user);
      // context.req.session.token = token;

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

      // Create JWT token or set session for authentication for the new user
      // Example with JWT:
      // const token = createToken(newUser);
      // context.req.session.token = token;

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
