const _ = require("lodash");
const moment = require("moment");
const { isAdmin, isAuthenticated } = require("../permissions");
const { orgs } = require("../data");
const { gql } = require("apollo-server-express");
const { and, or } = require("graphql-shield");
const { Booking, Venue, User } = require("../../db/models");
const venueModule = require("../../modules/venue/venueModule");
const { Op } = require("sequelize");
const { approvedStatuses } = require("../../modules/booking/bookingConstants");

const BookingResolvers = {
  Query: {
    async getApprovedBookingsToday(parent, { today }, ctx) {
      const startOfDay = moment(today).startOf("day");
      const endOfDay = moment(today).endOf("day");
      console.log(startOfDay, endOfDay);
      const bookings = await Booking.findAll({
        where: {
          //Date == Today and approvedStatus= APPROVED
          timeSlotStart: {
            [Op.lt]: endOfDay.format(),
            [Op.gt]: startOfDay.format(),
          },
          approvedStatus: approvedStatuses.APPROVED,
        },
      });

      // console.log(bookings);
      return bookings;
    },
    async allBookingsForOrg(parent, { orgPk }, ctx) {
      const bookings = await Booking.findAll({
        include: [
          {
            model: Venue,
            required: true,
            where: { orgPk },
            as: "belongsToVenue",
          },
        ],
      });
      return bookings;
    },
  },
  Mutation: {
    async createBooking(parent, args) {
      const {
        timeSlotStart,
        timeSlotEnd,
        venuePk,
        bookedBy,
        bookedAt,
        description,
      } = args;
      // const exisitingBooking = await Booking.findAll({
      //   where: { timeSlotStart, timeSlotEnd, venuePk, bookedBy },
      // });
      // if (!_.isEmpty(exisitingBooking)) {
      //   throw new Error("Booking exists already with the same Params");
      // }
      console.log({
        ...args,
        approvedStatus: approvedStatuses.PENDING,
      });
      const booking = await Booking.create({
        ...args,
        approvedStatus: approvedStatuses.PENDING,
      });
      console.log(booking);
      return booking;
    },
    async changeBookingStatus(parent, { bookingPk, approvedStatus }) {
      await Booking.update({ approvedStatus }, { where: { pk: bookingPk } });
      const updatedBooking = await Booking.findByPk(bookingPk);
      if (!updatedBooking || updatedBooking.approvedStatus != approvedStatus) {
        throw new Error("Sorry Couldn't update");
      }
      return updatedBooking;
    },
  },

  Booking: {
    venuePk(booking, args, ctx) {
      return Venue.findByPk(booking.venuePk);
    },
    bookedBy(booking, args, ctx) {
      return User.findByPk(booking.bookedBy);
    },
  },
};

const BookingTypes = gql`
  type Booking {
    pk: String!
    timeSlotStart: DateTime!
    timeSlotEnd: DateTime!
    bookedAt: DateTime!
    venuePk: Venue!
    description: String
    bookedBy: User!
    approvedStatus: BookingStatus!
  }

  enum BookingStatus{
    ${_.concat(_.values(approvedStatuses)).join(" ")}
  } 

  type Query {
    getApprovedBookingsToday(today: String): [Booking]
    allBookingsForOrg(orgPk: String!): [Booking]
  }

  type Mutation {
    createBooking(
      timeSlotStart: DateTime!
      timeSlotEnd: DateTime!
      venuePk: String!
      bookedAt: DateTime!
      description: String
      bookedBy: String!
    ): Booking

    changeBookingStatus(
      bookingPk: String!
      approvedStatus:BookingStatus!
    ):Booking

  }
`;

const BookingPermissions = {
  Query: {
    allBookingsForOrg: and(isAuthenticated, isAdmin),
    getApprovedBookingsToday: isAuthenticated,
  },
  Mutation: {
    createBooking: isAuthenticated,
    changeBookingStatus: and(isAuthenticated, isAdmin),
  },
};

module.exports = { BookingTypes, BookingResolvers, BookingPermissions };
