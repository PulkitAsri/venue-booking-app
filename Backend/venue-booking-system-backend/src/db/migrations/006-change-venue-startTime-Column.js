"use strict";
const tableName = "Venue";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(tableName, "openingTime", {
      type: Sequelize.TIME,
    });
    await queryInterface.changeColumn(tableName, "closingTime", {
      type: Sequelize.TIME,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn(tableName, "openingTime", {
      type: Sequelize.DATE,
    });
    await queryInterface.changeColumn(tableName, "closingTime", {
      type: Sequelize.DATE,
    });
  },
};
