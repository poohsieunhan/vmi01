const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize"); // Import instance Sequelize đã tạo
const RequestForm = require("./requestform.model");

const RequestFormDetail = sequelize.define(
  "RequestFormDetail",
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    RequestFormId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tblRequestForm", // tên bảng RequestForm trong database
        key: "Id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    ThietBiId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tblDevice", // tên bảng RequestForm trong database
        key: "Id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    SoLuong: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TrangThaiThietBiId: {
      type: DataTypes.TINYINT,
      allowNull: false,
      references: {
        model: "tblDeviceStatus", // tên bảng tblDeviceStatus trong database
        key: "Id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    isHC: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isKD: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isDTN: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isKhac: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    LabId: {
      type: DataTypes.TINYINT,
      allowNull: true,
      references: {
        model: "tblLab", // tên bảng Lab trong database
        key: "Id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    GhiChu: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    ThietBiSerial: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    tableName: "tblRequestFormDetail", // Tên bảng trong database
    timestamps: true,
  }
);

module.exports = RequestFormDetail;
