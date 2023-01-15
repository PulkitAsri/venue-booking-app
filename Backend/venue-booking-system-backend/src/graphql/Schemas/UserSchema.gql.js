const _ = require("lodash");
const bcrypt = require("bcryptjs");
const { isAdmin, isAuthenticated } = require("../permissions");
const { users } = require("../data");
const { gql } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const { and, or } = require("graphql-shield");
const { User } = require("../../db/models");
require("dotenv").config();

const UserResolvers = {
  Query: {
    me(parent, args, { user }) {
      console.log(user);
      return user;
    },
    user(parent, { pk }) {
      return _.find(users, (user) => user.pk === pk);
    },
  },
  Mutation: {
    login(parent, { email, password }) {
      const currentUser = _.find(users, (user) => user.email === email);
      if (!currentUser) {
        throw new Error("No User Found");
      }
      const { pk, isAdmin, name } = currentUser;
      const token = jwt.sign(
        { pk, name, email, isAdmin },
        process.env.JWT_SECRET,
        {
          algorithm: "HS256",
          subject: pk,
          expiresIn: "1h",
        }
      );
      return token;
    },
    register(parent, { name, email, password, isAdmin }) {
      const user = User.create({
        name,
        email,
        password,
        isAdmin,
      });
      console.log(user);
      return user;
    },
  },
};

const UserTypes = gql`
  type User {
    id: ID!
    pk: String!
    name: String
    email: String!
    isAdmin: Boolean!
  }

  type Query {
    me: User!
    user(pk: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): String
    register(
      name: String!
      email: String!
      password: String!
      isAdmin: Boolean!
    ): User
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
