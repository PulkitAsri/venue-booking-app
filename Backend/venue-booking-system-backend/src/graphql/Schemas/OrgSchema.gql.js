const _ = require("lodash");
const { isAdmin, isAuthenticated } = require("../permissions");
const { orgs } = require("../data");
const { gql } = require("apollo-server-express");
const { and, or } = require("graphql-shield");

const OrgResolvers = {
  Query: {
    org(parent, { pk }) {
      return _.find(orgs, (org) => org.pk === pk);
    },
  },
  Mutation: {
    createOrg(parent, { orgName, email, website, address, userPk }) {
      const existingOrg = _.find(orgs, (org) => org.orgName === orgName);
      if (existingOrg) {
        throw new Error("Org exists already.");
      }
      //create Org
      return "";
    },
  },
};

const OrgTypes = gql`
  type Org {
    pk: ID!
    orgName: String
    email: String
    website: String
    address: String
    ownerPk: ID!
  }

  type Query {
    org(pk: ID!): Org
  }

  type Mutation {
    createOrg(): String
  }
`;

const OrgPermissions = {
  Query: {},
  Mutation: {},
};

module.exports = { OrgTypes, OrgResolvers, OrgPermissions };
