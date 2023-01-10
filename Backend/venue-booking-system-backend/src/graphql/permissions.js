const { rule } = require("graphql-shield");

const isAuthenticated = rule()((parent, args, { user }) => {
  return user !== null;
});

const isAdmin = rule()((parent, args, { user }) => {
  return user.isAdmin;
});

module.exports = { isAuthenticated, isAdmin };
