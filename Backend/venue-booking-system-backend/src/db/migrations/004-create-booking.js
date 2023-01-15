"use strict";

const { approvedStatuses } = require("../../modules/booking/bookingConstants");
const _ = require("lodash");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Booking", {
      pk: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      timeSlotStart: {
        type: Sequelize.DATE,
      },
      timeSlotEnd: {
        type: Sequelize.DATE,
      },
      venuePk: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Venue",
          },
          key: "pk",
        },
      },
      bookedAt: {
        type: Sequelize.DATE,
      },
      description: {
        type: Sequelize.STRING,
      },
      bookedBy: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "User",
          },
          key: "pk",
        },
      },
      approvedStatus: {
        type: Sequelize.DataTypes.ENUM(
          _.concat(_.values(approvedStatuses)).join(",")
        ),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Booking");
  },
};
