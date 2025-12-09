///const RequestFormModel = require("../models/requestform.model");
const RequestFormDetailModel = require("../models/requestformdetail.model");
const { ErrorResponse, BadRequestError } = require("../core/error.response");
const { Op } = require("sequelize");
const DeviceStatus = require("../models/devicestatus.model");
const Device = require("../models/device.model");
const Lab = require("../models/lab.model");

class RequestFormDetailService {
  static async createRequestFormDetail(data) {
    const rf = await RequestFormDetailModel.create(data);
    return rf;
  }

  // Lấy danh sách Company
  //   static async getAllRequestFormDetail({ page = 1, limit = 20 } = {}) {
  //     const offset = (page - 1) * limit;

  //     const { rows, count } = await RequestFormModel.findAndCountAll({
  //       offset,
  //       limit,
  //       order: [["Id", "DESC"]],
  //     });

  //     return {
  //       data: rows,
  //       pagination: {
  //         page,
  //         limit,
  //         total: count,
  //         totalPages: Math.ceil(count / limit),
  //       },
  //     };
  //   }

  static async getRFDByRFId(rfId) {
    const rfd = await RequestFormDetailModel.findAll({
      where: {
        RequestFormId: rfId,
      },
      include: [
        { model: Device, as: "ThietBiText", attributes: ["Id", "TenThietBi"] },
        {
          model: DeviceStatus,
          as: "TrangThaiThietBiText",
          attributes: ["Id", "TenTrangThai"],
        },
        { model: Lab, as: "LabText", attributes: ["Id", "TenPhongBan"] },
      ],
      order: [["Id", "DESC"]],
    });
    if (!rfd) return null;
    return rfd; // có thể null nếu không tìm thấy
  }

  // Lấy detail 1 Company theo SoPhieu
  static async getRfdById(id) {
    const rf = await RequestFormDetailModel.findOne({ where: { Id: id } });
    return rf; // có thể null nếu không tìm thấy
  }

  // Cập nhật 1 Company
  static async updateRequestFormDetail(id, data) {
    //console.log("UpdateCompany - data:", data);
    //console.log("UpdateRequestForm - id:", id);

    const rf = await RequestFormDetailModel.findByPk(id);
    if (!rf) {
      return null;
    }

    await rf.update(data);
    return rf;
  }

  // Xóa 1 Company
  static async deleteRequestFormDetail(id) {
    const rfd = await RequestFormDetailModel.findByPk(id);
    if (!rfd) {
      return null;
    }
    await rfd.destroy();
    return true;
  }
}

module.exports = RequestFormDetailService;
