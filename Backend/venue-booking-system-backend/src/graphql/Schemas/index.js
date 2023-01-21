const { typeDefs: scalarTypeDefs } = require("graphql-scalars");
const { resolvers: scalarResolvers } = require("graphql-scalars");

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
const {
  VenueTypes,
  VenueResolvers,
  VenuePermissions,
} = require("./VenueSchema.gql.js");

const { shield } = require("graphql-shield");
const { makeExecutableSchema } = require("@graphql-tools/schema");
// const { DateTimeScalarType } = require("../Scalers/DateTime.gql.js");
const { gql } = require("apollo-server-express");

// const customDateTimeResolver = { DateTime: DateTimeScalarType };
// const DateTime = "scalar DateTime";
// console.log(scalarResolvers);
const typeDefs = [UserTypes, OrgTypes, VenueTypes, ...scalarTypeDefs];
const resolvers = _.merge(
  UserResolvers,
  OrgResolvers,
  VenueResolvers,
  // customDateTimeResolver
  // DateTimeResolver
  scalarResolvers
);

const allPermissions = [UserPermissions, OrgPermissions, VenuePermissions];

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

// const schema = makeExecutableSchema({
//   typeDefs: [...DateTimeTypeDefinition],
//   resolvers: {
//     ...DateTimeResolver,
//   },
// });
const schema = makeExecutableSchema({ typeDefs, resolvers });

const protectedSchema = applyMiddleware(schema, permissions);
module.exports = { executableSchema: protectedSchema };
