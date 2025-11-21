// services/company.service.js
const Company = require("../models/company.model");

class CompanyService {
  // Tạo mới 1 Company
  static async createCompany(data) {
    const company = await Company.create(data);
    return company;
  }

  // Lấy danh sách Company
  static async getAllCompanies({ page = 1, limit = 20 } = {}) {
    const offset = (page - 1) * limit;

    const { rows, count } = await Company.findAndCountAll({
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

  // Lấy detail 1 Company theo Id
  static async getCompanyById(id) {
    const company = await Company.findByPk(id);
    return company; // có thể null nếu không tìm thấy
  }

  // Cập nhật 1 Company
  static async updateCompany(id, data) {
    const company = await Company.findByPk(id);
    if (!company) {
      return null;
    }

    await company.update(data);
    return company;
  }

  // Xóa 1 Company
  static async deleteCompany(id) {
    const company = await Company.findByPk(id);
    if (!company) {
      return null;
    }

    await company.destroy();
    return true;
  }
}

module.exports = CompanyService;
