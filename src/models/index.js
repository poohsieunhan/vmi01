const Company = require("./company.model");
const Device = require("./device.model");
const RequestForm = require("./requestform.model");
const RequestFormDetail = require("./requestformdetail.model");
const DeviceStatus = require("./devicestatus.model");
const Lab = require("./lab.model");

RequestForm.belongsTo(Company, {
  as: "CongTy",
  foreignKey: "CongtyId",
  targetKey: "Id",
});

RequestForm.belongsTo(Company, {
  as: "CongTySuDung",
  foreignKey: "CongTySuDungId",
  targetKey: "Id",
});

RequestForm.hasMany(RequestFormDetail, {
  as: "Details",
  foreignKey: "RequestFormId",
});

RequestFormDetail.belongsTo(RequestForm, {
  as: "RequestFormText",
  foreignKey: "RequestFormId",
  targetKey: "Id",
});

RequestFormDetail.belongsTo(Device, {
  as: "ThietBiText",
  foreignKey: "ThietBiId",
  targetKey: "Id",
});

RequestFormDetail.belongsTo(DeviceStatus, {
  as: "TrangThaiThietBiText",
  foreignKey: "TrangThaiThietBiId",
  targetKey: "Id",
});

RequestFormDetail.belongsTo(Lab, {
  as: "LabText",
  foreignKey: "LabId",
  targetKey: "Id",
});

module.exports = {
  Company,
  Device,
  RequestForm,
  RequestFormDetail,
};
