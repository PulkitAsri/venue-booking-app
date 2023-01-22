const _ = require("lodash");
const moment = require("moment");
const { isAdmin, isAuthenticated } = require("../permissions");
const { orgs } = require("../data");
const { gql } = require("apollo-server-express");
const { and, or } = require("graphql-shield");
const { Booking, Venue, User } = require("../../db/models");
const bookingModule = require("../../modules/booking/bookingModule");
const venueModule = require("../../modules/venue/venueModule");
const userModule = require("../../modules/user/userModule");
const { Op } = require("sequelize");
const { approvedStatuses } = require("../../modules/booking/bookingConstants");

const BookingResolvers = {
  Query: {
    async getApprovedBookingsOnDate(parent, { date }, ctx) {
      const bookings = await bookingModule.getTakenSlotsOnDate({ date });
      return bookings;
    },
    async allBookingsForOrg(parent, { orgPk }, ctx) {
      const bookings = await bookingModule.getAllForOrg({ orgPk });
      return bookings;
    },
  },
  Mutation: {
    async createBooking(parent, args) {
      const booking = await bookingModule.create(args);
      return booking;
    },
    async changeBookingStatus(parent, { bookingPk, approvedStatus }) {
      let updatedBooking;
      // if (approvedStatus == approvedStatuses.APPROVED) {
      //   updatedBooking = bookingModule.approveRequest({
      //     bookingPk,
      //     approvedStatus,
      //   });
      // } else {
      updatedBooking = bookingModule.updateStatus({
        bookingPk,
        approvedStatus,
      });
      // }
      return updatedBooking;
    },
  },

  Booking: {
    venuePk(booking, args, ctx) {
      return venueModule.getByPk({ venuePk: booking.venuePk });
    },
    bookedBy(booking, args, ctx) {
      return userModule.getByPk({ pk: booking.bookedBy });
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
    getApprovedBookingsOnDate(date: String): [Booking]
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
    getApprovedBookingsOnDate: isAuthenticated,
  },
  Mutation: {
    createBooking: isAuthenticated,
    changeBookingStatus: and(isAuthenticated, isAdmin),
  },
};

module.exports = { BookingTypes, BookingResolvers, BookingPermissions };
