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
      type: DataTypes.DATE,
    },
    closingTime: {
      type: DataTypes.DATE,
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
    // Venue.hasOne(models.User, { foreignKey: "userId", as: "posts" });
    Venue.belongsTo(models.User, { foreignKey: "orgPk", as: "belongsToOrg" });
    Venue.hasMany(models.Booking);
  };
  return Venue;
};
