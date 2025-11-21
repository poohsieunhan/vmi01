"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tblCompany", {
      Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      TenCongTy: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      DiaChi: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      MaSoThue: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      Email: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      Tel: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      Fax: {
        type: Sequelize.STRING(25),
        allowNull: false,
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
    await queryInterface.dropTable("tblCompany");
  }
};
