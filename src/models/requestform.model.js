const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize"); // Import instance Sequelize đã tạo

const RequestForm = sequelize.define(
  "RequestForm",
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    SoPhieu: {
      type: DataTypes.STRING(20), // Kiểu chuỗi, giới hạn 100 ký tự
      allowNull: false, // Không được để trống
    },
    NgayNhan: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    NgayTraDuKien: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    CongTyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tblCompany", // tên bảng Company trong database
        key: "Id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    ThucHienTai: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    YeuCauGiay: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    YeuCauHieuChinh: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    CoSo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    YeuCauPhuongPhap: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    HinhThucGiaoNhan: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, //true: trực tiếp, false: gián tiếp
    },
    SoBG: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    NgayTraThucTe: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    CongTySuDungId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      references: {
        model: "tblCompany", // tên bảng Company trong database
        key: "Id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
  },
  {
    tableName: "tblRequestForm", // Tên bảng trong database
    timestamps: true,
  }
);

module.exports = RequestForm;
