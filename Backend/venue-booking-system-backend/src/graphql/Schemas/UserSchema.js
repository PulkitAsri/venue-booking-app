const _ = require("lodash");
const bcrypt = require("bcryptjs");
const { isAdmin, isAuthenticated } = require("../permissions");
const { users } = require("../data");
const { gql } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const { and, or, shield } = require("graphql-shield");
require("dotenv").config();

const UserResolvers = {
  Query: {
    me(parent, args, { user }) {
      console.log(user);
      return user;
    },
    user(parent, { id }) {
      return _.find(users, (user) => user.id === id);
    },
  },
  Mutation: {
    login(parent, { email, password }) {
      const currentUser = _.find(users, (user) => user.email === email);
      if (!currentUser) {
        throw new Error("No User Found");
      }
      // const isEqual = bcrypt.compare(password, currentUser.password);
      const { id, isAdmin, name } = currentUser;
      const token = jwt.sign(
        { id, name, email, isAdmin },
        process.env.JWT_SECRET,
        {
          algorithm: "HS256",
          subject: id,
          expiresIn: "1h",
        }
      );
      return token;
    },
    createUser(parent, { email, password }) {
      const existingUser = _.find(users, (user) => user.email === email);
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = bcrypt.hash(password, 12);

      //create User
      return "";
    },
  },
};

const UserTypes = gql`
  type User {
    id: ID!
    name: String
    email: String
    isAdmin: Boolean
  }

  type Query {
    me: User!
    user(id: ID!): User
  }

  type Mutation {
    login(email: String!, password: String!): String
    createUser(email: String!, password: String!): String
  }
`;

const UserPermissions = {
  Query: {
    me: isAuthenticated,
    user: and(isAuthenticated, isAdmin),
  },
  Mutation: {},
};

module.exports = { UserTypes, UserResolvers, UserPermissions };
