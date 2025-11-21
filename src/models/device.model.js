const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize"); // Import instance Sequelize đã tạo

const Device = sequelize.define(
  "Device",
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    TenThietBi: {
      type: DataTypes.STRING(150), // Kiểu chuỗi, giới hạn 100 ký tự
      allowNull: false, // Không được để trống
    },
    MaThietBi: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  },
  {
    tableName: "tblDevice", // Tên bảng trong database
    timestamps: true,
  }
);

module.exports = Device;
