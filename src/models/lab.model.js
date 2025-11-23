const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize"); // Import instance Sequelize đã tạo

const Lab = sequelize.define(
  "Lab",
  {
    Id: {
      type: DataTypes.TINYINT,
      autoIncrement: true,
      primaryKey: true,
    },
    TenPhongBan: {
      type: DataTypes.STRING(150), // Kiểu chuỗi, giới hạn 100 ký tự
      allowNull: false, // Không được để trống
    },
  },
  {
    tableName: "tblLab", // Tên bảng trong database
    timestamps: true,
  }
);

module.exports = Lab;
