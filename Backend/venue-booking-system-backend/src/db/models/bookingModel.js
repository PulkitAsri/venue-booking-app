"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    pk: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    timeSlotStart: {
      type: DataTypes.DATE,
    },
    timeSlotEnd: {
      type: DataTypes.DATE,
    },
    venuePk: {
      type: DataTypes.UUID,
      references: {
        model: {
          tableName: "Venue",
        },
        key: "pk",
      },
    },
    bookedAt: {
      type: DataTypes.DATE,
    },
    description: {
      type: DataTypes.STRING,
    },
    bookedBy: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      references: {
        model: {
          tableName: "User",
        },
        key: "pk",
      },
    },
    approvedStatus: {
      type: DataTypes.DataTypes.ENUM(
        _.concat(_.values(approvedStatuses)).join(",")
      ),
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });

  //ASSOCIATIONS
  Booking.associate = function (models) {
    // Booking.hasOne(models.User, { foreignKey: "userId", as: "posts" });
    Booking.belongsTo(models.User, {
      foreignKey: "bookedBy",
      as: "belongsToUser",
    });

    Booking.belongsTo(models.Venue, {
      foreignKey: "venuePk",
      as: "belongsToVenue",
    });
  };
  return Booking;
};
