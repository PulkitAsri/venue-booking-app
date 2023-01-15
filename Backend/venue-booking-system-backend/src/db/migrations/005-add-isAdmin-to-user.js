"use strict";
const tableName = "User";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(tableName, "isAdmin", {
      type: Sequelize.BOOLEAN,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(tableName, "isAdmin");
  },
};
