"use strict";
const tableName = "Venue";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(tableName, {
      pk: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      venueName: {
        type: Sequelize.STRING,
      },
      openingTime: {
        type: Sequelize.DATE,
      },
      closingTime: {
        type: Sequelize.DATE,
      },
      address: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      orgPk: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Org",
          },
          key: "pk",
        },
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
    await queryInterface.dropTable(tableName);
  },
};
