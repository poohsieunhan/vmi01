const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize"); // Import instance Sequelize đã tạo

const Company = sequelize.define(
  "Company",
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    TenCongTy: {
      type: DataTypes.STRING(150), // Kiểu chuỗi, giới hạn 100 ký tự
      allowNull: false, // Không được để trống
    },
    DiaChi: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    MaSoThue: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Tel: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    Fax: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    NguoiDaiDien: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    ChucVu: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "tblCompany", // Tên bảng trong database
    timestamps: true,
  }
);

module.exports = Company;
