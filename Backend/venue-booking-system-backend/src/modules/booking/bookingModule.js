const _ = require("lodash");
const moment = require("moment");
const { Booking, Venue, User } = require("../../db/models");
const { Op } = require("sequelize");
const { approvedStatuses } = require("../../modules/booking/bookingConstants");

const create = async (args) => {
  const {
    timeSlotStart,
    timeSlotEnd,
    venuePk,
    bookedBy,
    bookedAt,
    description,
  } = args;
  const exisitingBooking = await Booking.findAll({
    where: { timeSlotStart, timeSlotEnd, venuePk, bookedBy },
  });
  if (!_.isEmpty(exisitingBooking)) {
    throw new Error("Booking exists already with the same Params");
  }

  const booking = await Booking.create({
    ...args,
    approvedStatus: approvedStatuses.PENDING,
  });
  console.log(booking);
  return booking;
};
const getTakenSlotsOnDate = async ({ date }) => {
  const startOfDay = moment(date).startOf("day");
  const endOfDay = moment(date).endOf("day");
  console.log(startOfDay, endOfDay);
  const bookings = await Booking.findAll({
    where: {
      //Date == Today and approvedStatus= APPROVED
      timeSlotStart: {
        [Op.lt]: endOfDay.format(),
        [Op.gte]: startOfDay.format(),
      },
      approvedStatus: approvedStatuses.APPROVED,
    },
  });

  // console.log(bookings);
  return bookings;
};

const getAllForOrg = async ({ orgPk }) => {
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
};

const updateStatus = async ({ bookingPk, approvedStatus }) => {
  await Booking.update({ approvedStatus }, { where: { pk: bookingPk } });
  const updatedBooking = await Booking.findByPk(bookingPk);
  if (!updatedBooking || updatedBooking.approvedStatus != approvedStatus) {
    throw new Error("Sorry Couldn't update");
  }
  return updatedBooking;
};

const approveRequest = async ({ bookingPk }) => {
  const booking = await Booking.findByPk(bookingPk);
  const takenSlotsOnDate = await getTakenSlotsOnDate({
    date: booking.timeSlotStart,
  });
  // console.log(takenSlotsOnDate);

  const start = moment(booking.timeSlotStart);
  const end = moment(booking.timeSlotEnd);

  _.forEach(takenSlotsOnDate, (slot) => {
    const approvedStart = moment(slot.timeSlotStart);
    const approvedEnd = moment(slot.timeSlotEnd);
    if (
      (approvedStart.isSameOrBefore(start) && start.isBefore(approvedEnd)) ||
      (approvedStart.isBefore(end) && end.isSameOrBefore(approvedEnd))
    ) {
      throw new Error("Couldn't approve request. This slot is already taken");
    }
  });
  //else
  const updatedBooking = await updateStatus({
    bookingPk,
    approvedStatus: approvedStatuses.APPROVED,
  });

  return updatedBooking;
};

module.exports = {
  create,
  getTakenSlotsOnDate,
  getAllForOrg,
  updateStatus,
  approveRequest,
};
