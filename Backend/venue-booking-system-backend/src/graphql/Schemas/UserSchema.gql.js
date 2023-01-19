const _ = require("lodash");
const bcrypt = require("bcryptjs");
const { isAdmin, isAuthenticated } = require("../permissions");
const { gql, AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const { and, or } = require("graphql-shield");
const {
  getUserByEmail,
  getOrCreateUser,
  generateToken,
  getUserByPk,
} = require("../../modules/user/userModule");
require("dotenv").config();

const UserResolvers = {
  Query: {
    me(parent, args, { user }) {
      return user;
    },
    user(parent, { pk }) {
      return getUserByPk({ pk });
    },
  },
  Mutation: {
    async login(parent, { email, password }) {
      const user = await getUserByEmail({ email });

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = await generateToken({ user });
        return { user, token };
      } else {
        throw new AuthenticationError("Invalid Credentials");
      }
    },
    async register(parent, { name, email, password, isAdmin }) {
      const existingUser = await getUserByEmail({ email });
      if (existingUser && existingUser.isAdmin && !isAdmin) {
        throw new AuthenticationError("User already exist");
      }

      const user = await getOrCreateUser({ name, email, password, isAdmin });
      if (!user) {
        throw new AuthenticationError("Couldn't create user");
      }

      const token = await generateToken({ user });
      return { user, token };
    },
  },
};

const UserTypes = gql`
  type User {
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
    login(email: String!, password: String!): AuthData
    register(
      name: String!
      email: String!
      password: String!
      isAdmin: Boolean!
    ): AuthData
  }

  type AuthData {
    user: User!
    token: String!
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
