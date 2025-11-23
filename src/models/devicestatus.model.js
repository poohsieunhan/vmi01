const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize"); // Import instance Sequelize đã tạo

const DeviceStatus = sequelize.define(
  "DeviceStatus",
  {
    Id: {
      type: DataTypes.TINYINT,
      autoIncrement: true,
      primaryKey: true,
    },
    TenTrangThai: {
      type: DataTypes.STRING(25), // Kiểu chuỗi, giới hạn 100 ký tự
      allowNull: false, // Không được để trống
    },
  },
  {
    tableName: "tblDeviceStatus", // Tên bảng trong database
    timestamps: true,
  }
);

module.exports = DeviceStatus;
