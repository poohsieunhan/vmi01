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
      SoLuong: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
      TrangThaiThietBiId: {
            type: Sequelize.TINYINT,
            allowNull: false,
            references: {
              model: "tblDeviceStatus", // tên bảng tblDeviceStatus trong database
              key: "Id",  
            },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
          },
      isHC: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },  
      isKD: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
      isDTN: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },  
      isKhac: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          }, 
      LabId: {
            type: Sequelize.TINYINT,
            allowNull: true,
            references: {
              model: "tblLab", // tên bảng Lab trong database
              key: "Id",
            },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
          },
      GhiChu: {
            type: Sequelize.STRING(150),
            allowNull: true,
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
