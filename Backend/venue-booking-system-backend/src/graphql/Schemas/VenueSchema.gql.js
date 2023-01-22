const _ = require("lodash");
const moment = require("moment");
const { isAdmin, isAuthenticated } = require("../permissions");
const { orgs } = require("../data");
const { gql } = require("apollo-server-express");
const { and, or } = require("graphql-shield");
const { Venue, Org } = require("../../db/models");
const venueModule = require("../../modules/venue/venueModule");
const { Op } = require("sequelize");

const VenueResolvers = {
  Query: {
    async allVenuesForOrg(parent, { orgPk }, ctx) {
      const venues = await venueModule.getAllForOrgPk({ orgPk });
      return venues;
    },
    async allVenues(parent, args, ctx) {
      const venues = await venueModule.getAll();
      return venues;
    },
    async venueForPk(parent, { venuePk }, ctx) {
      return venueModule.getByPk({ venuePk });
    },
  },
  Mutation: {
    async createVenue(parent, args) {
      console.log(args);
      const existingVenue = await Venue.findAll({
        where: {
          [Op.and]: [{ venueName: args.venueName }, { orgPk: args.orgPk }],
        },
      });
      console.log(existingVenue);
      if (!_.isEmpty(existingVenue)) {
        throw new Error("Venue exists already with the venueName in this org");
      }

      const venue = await venueModule.createVenue(args);
      console.log(venue);
      return venue;
    },

    async updateVenue(parent, args, { user }) {
      if (args.ownerPk) {
        throw new Error(
          "You cant update the userAdmin without permission. Feature Coming Soon!"
        );
      }
      console.log(args);

      const updateDict = _.pickBy(
        args,
        (val) => !_.isUndefined(val) && !_.isNull(val)
      );

      if (updateDict.openingTime)
        updateDict.openingTime = moment(args.openingTime)
          .utc()
          .format("HH:mm:ss");
      if (updateDict.closingTime)
        updateDict.closingTime = moment(args.closingTime)
          .utc()
          .format("HH:mm:ss");

      // console.log(updateDict);
      await Venue.update(updateDict, {
        where: { pk: args.venuePk },
      });

      const updatedVenue = await venueModule.getByPk({ venuePk: args.venuePk });
      //check if its actually updated
      _.entries(updateDict).forEach((key) => {
        if (updateDict[key] != updatedVenue[key]) {
          throw new Error("Update Check Failed");
        }
      });

      return updatedVenue;
    },
  },

  Venue: {
    orgPk(venue, args, ctx) {
      return Org.findByPk(venue.orgPk);
    },
  },
};

const VenueTypes = gql`
  type Venue {
    pk: String!
    venueName: String!
    openingTime: Time!
    closingTime: Time!
    address: String
    description: String
    images: [String]
    orgPk: Org!
  }

  type Query {
    # org: Venue
    allVenues: [Venue]
    allVenuesForOrg(orgPk: String!): [Venue]
    venueForPk(venuePk: String!): Venue
  }

  type Mutation {
    createVenue(
      venueName: String!
      openingTime: Time!
      closingTime: Time!
      address: String
      description: String
      images: [String]
      orgPk: String!
    ): Venue

    updateVenue(
      venuePk: String!
      venueName: String
      openingTime: Time
      closingTime: Time
      address: String
      description: String
      images: [String] # orgPk: String
    ): Venue
  }
`;

const VenuePermissions = {
  Query: {
    // allVenues: isAuthenticated,
    // allVenuesForOrg: isAuthenticated,
    // venueForPk: isAuthenticated,
  },
  Mutation: {
    createVenue: and(isAuthenticated, isAdmin),
    updateVenue: and(isAuthenticated, isAdmin),
  },
};

module.exports = { VenueTypes, VenueResolvers, VenuePermissions };
