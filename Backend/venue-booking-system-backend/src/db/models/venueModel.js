"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Venue = sequelize.define("Venue", {
    pk: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    venueName: {
      type: DataTypes.STRING,
    },
    openingTime: {
      type: DataTypes.TIME,
    },
    closingTime: {
      type: DataTypes.TIME,
    },
    address: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    orgPk: {
      type: DataTypes.UUID,
      references: {
        model: {
          tableName: "Org",
        },
        key: "pk",
      },
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
  Venue.associate = function (models) {
    Venue.belongsTo(models.Org, { foreignKey: "orgPk", as: "belongsToOrg" });
    Venue.hasMany(models.Booking, {
      foreignKey: "venuePk",
      as: "belongsToVenue",
    });
  };
  return Venue;
};
