const _ = require("lodash");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const { Venue } = require("../../db/models");
require("dotenv").config();

const getByPk = async ({ venuePk }) => {
  const venue = await Venue.findByPk(venuePk);
  venue.openingTime = venue.openingTime + "Z";
  venue.closingTime = venue.closingTime + "Z";
  return venue;
};

const getAll = async () => {
  const venues = await Venue.findAll();
  _.forEach(venues, (venue) => {
    venue.openingTime = venue.openingTime + "Z";
    venue.closingTime = venue.closingTime + "Z";
  });
  return venues;
};
const getAllForOrgPk = async ({ orgPk }) => {
  const venues = await Venue.findAll({ where: { orgPk } });
  _.forEach(venues, (venue) => {
    venue.openingTime = venue.openingTime + "Z";
    venue.closingTime = venue.closingTime + "Z";
  });
  console.log(venues);
  return venues;
};
const createVenue = async (args) => {
  const start = moment(args.openingTime).utc().format("HH:mm:ss");
  const end = moment(args.closingTime).utc().format("HH:mm:ss");
  //create Venue
  const venue = await Venue.create({
    ...args,
    openingTime: start,
    closingTime: end,
  });
  // hack
  venue.openingTime = venue.openingTime + "Z";
  venue.closingTime = venue.closingTime + "Z";
  console.log(venue.openingTime);

  return venue;
};

module.exports = { createVenue, getAll, getAllForOrgPk, getByPk };
