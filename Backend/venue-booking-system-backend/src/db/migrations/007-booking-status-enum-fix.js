"use strict";
const _ = require("lodash");
const { approvedStatuses } = require("../../modules/booking/bookingConstants");

const tableName = "Booking";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(tableName, "approvedStatus", {
      type: Sequelize.TEXT,
    });
    await queryInterface.sequelize.query(
      `drop type if exists "enum_Booking_approvedStatus";`
    );

    await queryInterface.changeColumn(tableName, "approvedStatus", {
      type: Sequelize.ENUM,
      values: _.values(approvedStatuses),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn(tableName, "approvedStatus", {
      type: Sequelize.TEXT,
    });
    await queryInterface.sequelize.query(
      `drop type "enum_Booking_approvedStatus";`
    );
    await queryInterface.changeColumn(tableName, "approvedStatus", {
      type: Sequelize.DataTypes.ENUM(
        _.concat(_.values(approvedStatuses)).join(",")
      ),
    });
  },
};
