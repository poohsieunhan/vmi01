"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tblRequestForm", {
      Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      SoPhieu: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      NgayNhan: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      NgayTraDuKien: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      CongTyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tblCompany',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      ThucHienTai: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      YeuCauGiay: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      YeuCauHieuChinh: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      CoSo: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      YeuCauPhuongPhap: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      HinhThucGiaoNhan: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      SoBG: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      NgayTraThucTe: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("tblRequestForm");
  }
};
