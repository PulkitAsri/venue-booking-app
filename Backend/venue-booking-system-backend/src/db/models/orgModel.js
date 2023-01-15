"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Org = sequelize.define("Org", {
    pk: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    orgName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    website: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    ownerPk: {
      type: DataTypes.UUID,
      references: {
        model: {
          tableName: "User",
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
  Org.associate = function (models) {
    Org.belongsTo(models.User, { foreignKey: "ownerPk", as: "belongsToUser" });
    Org.hasMany(models.Venue);
  };
  return Org;
};
