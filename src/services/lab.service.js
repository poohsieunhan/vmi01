// services/company.service.js
const LabModel = require("../models/lab.model");
const { ErrorResponse, BadRequestError } = require("../core/error.response");

class LabService {
  // Tạo mới 1 Company
  static async createLab(data) {
    const tenPhongBan = data.TenPhongBan;
    const foundLab = await LabModel.findOne({
      where: { TenPhongBan: tenPhongBan },
    });
    if (foundLab) {
      throw new ErrorResponse("Lab with this TenPhongBan already exists.");
    }

    const lab = await LabModel.create(data);
    return lab;
  }

  // Lấy danh sách Company
  static async getAllLabs({ page = 1, limit = 20 } = {}) {
    const offset = (page - 1) * limit;

    const { rows, count } = await LabModel.findAndCountAll({
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

  static async getLabById(id) {
    const lab = await LabModel.findByPk(id);
    return lab;
  }

  static async updateLab(id, data) {
    const lab = await LabModel.findByPk(id);
    if (!lab) {
      return null;
    }

    await lab.update(data);
    return lab;
  }

  // Xóa 1 Company
  static async deleteLab(id) {
    const lab = await LabModel.findByPk(id);
    if (!lab) {
      return null;
    }

    await lab.destroy();
    return true;
  }
}

module.exports = LabService;
