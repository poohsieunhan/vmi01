const RequestFormModel = require("../models/requestform.model");
const RequestFormDetailModel = require("../models/requestformdetail.model");
const { ErrorResponse, BadRequestError } = require("../core/error.response");
const { Op } = require("sequelize");
const CompanyModel = require("../models/company.model");


class RequestFormService {
  static async createRequestForm(data) {
    const soPhieu = data.SoPhieu;
    const existingRF = await RequestFormModel.findOne({
      where: { SoPhieu: soPhieu },
    });
    if (existingRF) {
      throw new ErrorResponse("SoPhieu already exists.");
    }

    const rf = await RequestFormModel.create(data);
    return rf;
  }

  static async getAllRequestForm({ page = 1, limit = 20 } = {}) {
    const offset = (page - 1) * limit;

    const { rows, count } = await RequestFormModel.findAndCountAll({
      include: [       
          { model: CompanyModel, as: "CongTy", attributes: ["Id", "TenCongTy"] },
          { model: CompanyModel, as: "CongTySuDung", attributes: ["Id", "TenCongTy"] },        
      ],
      offset,
      limit,
      order: [["Id", "DESC"]],
    });

    return {
      data: rows,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  // Lấy detail 1 Company theo SoPhieu
  static async getRfBySoPhieu(soPhieu) {
    const rf = await RequestFormModel.findAll({
      where: {
        SoPhieu: { [Op.like]: `%${soPhieu}%` },
      },
    });
    return rf; // có thể null nếu không tìm thấy
  }

  // Cập nhật 1 Company
  static async updateRequestForm(id, data) {
    //console.log("UpdateCompany - data:", data);
    //console.log("UpdateRequestForm - id:", id);
    

    const rf = await RequestFormModel.findByPk(id);
    if (!rf) {
      return null;
    }

    await rf.update(data);
    return rf;
  }

  // Xóa 1 Company
  static async deleteRequestForm(id) {
    const rf = await RequestFormModel.findByPk(id);
    if (!rf) {
      return null;
    }
    const foundRfd = await RequestFormDetailModel.findByPk(rf.RequestFormId);
    if (foundRfd) {
      await foundRfd.destroy();
    }
    await rf.destroy();
    return true;
  }
}

module.exports = RequestFormService;
