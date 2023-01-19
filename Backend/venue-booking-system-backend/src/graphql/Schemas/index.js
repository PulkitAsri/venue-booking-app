const _ = require("lodash");
const { applyMiddleware } = require("graphql-middleware");
const {
  UserTypes,
  UserResolvers,
  UserPermissions,
} = require("./UserSchema.gql.js");
const {
  OrgTypes,
  OrgResolvers,
  OrgPermissions,
} = require("./OrgSchema.gql.js");
const { shield } = require("graphql-shield");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const typeDefs = [UserTypes, OrgTypes];
const resolvers = _.merge(UserResolvers, OrgResolvers);

const allPermissions = [UserPermissions, OrgPermissions];

const queryPermissions = _.assign(
  ..._.map(allPermissions, ({ Query }) => Query)
);
const mutationPermissions = _.assign(
  ..._.map(allPermissions, ({ Mutation }) => Mutation)
);
// console.log({
//   Query: queryPermissions,
//   Mutation: mutationPermissions,
// });

const permissions = shield(
  {
    Query: queryPermissions,
    Mutation: mutationPermissions,
  },
  {
    debug: true,
  }
);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const protectedSchema = applyMiddleware(schema, permissions);
module.exports = { executableSchema: protectedSchema };
