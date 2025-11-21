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
  },
  {
    tableName: "tblRequestFormDetail", // Tên bảng trong database
    timestamps: true,
  }
);

module.exports = RequestFormDetail;
