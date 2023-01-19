"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      pk: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      defaultScope: {
        rawAttributes: { exclude: ["password"] },
      },
    }
  );

  User.beforeCreate(async (user) => {
    user.password = await user.generatePasswordHash();
  });
  User.prototype.generatePasswordHash = function () {
    if (this.password) {
      return bcrypt.hash(this.password, 10);
    }
  };

  //ASSOCIATIONS
  User.associate = function (models) {
    User.hasOne(models.Org, { foreignKey: "ownerPk", as: "belongsToUser" });
    User.hasMany(models.Booking, {
      foreignKey: "bookedBy",
      as: "bookingBelongsToUser",
    });
  };
  return User;
};
