"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tblRequestFormDetail", {
      Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      RequestFormId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tblRequestForm',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      ThietBiId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tblDevice',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tblRequestFormDetail");
  }
};
