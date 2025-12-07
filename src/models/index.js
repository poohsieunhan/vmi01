const Company = require("./company.model");
const Device = require("./device.model");
const RequestForm = require("./requestform.model");
const RequestFormDetail = require("./requestformdetail.model");

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
  as: "ChiTiet",
  foreignKey: "RequestFormId",
});

RequestFormDetail.belongsTo(RequestForm, {
  foreignKey: "RequestFormId",
});


module.exports = {
  Company,
  Device,
  RequestForm,
  RequestFormDetail,
};
