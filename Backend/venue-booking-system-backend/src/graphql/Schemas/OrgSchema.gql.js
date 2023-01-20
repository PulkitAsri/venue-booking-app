const _ = require("lodash");
const { isAdmin, isAuthenticated } = require("../permissions");
const { orgs } = require("../data");
const { gql } = require("apollo-server-express");
const { and, or } = require("graphql-shield");
const { Org } = require("../../db/models");
const { getUserByPk } = require("../../modules/user/userModule");
const { Op } = require("sequelize");

const OrgResolvers = {
  Query: {
    async org(parent, args, { user }) {
      console.log("hehe userpk", user.pk);
      const org = await Org.findOne({ where: { ownerPk: user.pk } });
      console.log("hehe org", org);
      return org;
    },

    async allOrgs(parent, args, ctx) {
      return Org.findAll();
    },
  },
  Mutation: {
    async createOrg(parent, { orgName, email, website, address, ownerPk }) {
      const existingOrg = await Org.findAll({
        where: {
          [Op.or]: [{ orgName }, { ownerPk }],
        },
      });
      console.log(existingOrg);
      if (!_.isEmpty(existingOrg)) {
        throw new Error(
          "Org exists already with either the same orgName or same User ownerPk"
        );
      }

      //create Org
      const org = await Org.create({
        orgName,
        email,
        website,
        address,
        ownerPk,
      });
      return org;
    },

    async updateOrg(parent, args, { user }) {
      if (args.ownerPk) {
        throw new Error(
          "You cant update the userAdmin without permission. Feature Coming Soon!"
        );
      }
      const updateDict = _.pickBy(args, (val) => !_.isUndefined(val));
      // console.log(updateDict);
      await Org.update(updateDict, {
        where: { pk: args.orgPk },
      });
      const updatedOrg = await Org.findByPk(args.orgPk);

      _.entries(updateDict).forEach((key) => {
        if (updateDict[key] != updatedOrg[key]) {
          throw new Error("Sorry Couldn't update");
        }
      });

      // console.log(updatedOrg);
      return updatedOrg;
    },
  },

  Org: {
    ownerPk(org, args, ctx) {
      return getUserByPk({ pk: org.ownerPk });
    },
  },
};

const OrgTypes = gql`
  type Org {
    pk: String!
    orgName: String!
    email: String
    website: String
    address: String
    ownerPk: User!
  }

  type Query {
    org: Org
    allOrgs: [Org]
  }

  type Mutation {
    createOrg(
      orgName: String!
      email: String!
      website: String
      address: String
      ownerPk: String
    ): Org

    updateOrg(
      orgPk: String!
      orgName: String
      email: String
      website: String
      address: String
    ): Org
  }
`;

const OrgPermissions = {
  Query: {
    org: and(isAuthenticated, isAdmin), //my Org
    allOrgs: isAuthenticated,
  },
  Mutation: {
    createOrg: and(isAuthenticated, isAdmin),
    updateOrg: and(isAuthenticated, isAdmin),
  },
};

module.exports = { OrgTypes, OrgResolvers, OrgPermissions };
