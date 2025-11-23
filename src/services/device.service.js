// services/company.service.js
const DeviceModel = require("../models/device.model");
const {ErrorResponse, BadRequestError} = require("../core/error.response");

class DeviceService {
  // Tạo mới 1 Company
  static async createDevice(data) {
    const tenThieBi = data.TenThietBi;
    const foundDevice = await DeviceModel.findOne({ where: { TenThietBi: tenThieBi } });
    if (foundDevice) {
      throw new ErrorResponse("Device with this TenThietBi already exists.");
    }

    const device = await DeviceModel.create(data);
    return device;
  }

  // Lấy danh sách Company
  static async getAllDevices({ page = 1, limit = 20 } = {}) {
    const offset = (page - 1) * limit;

    const { rows, count } = await DeviceModel.findAndCountAll({
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
  static async getDeviceById(id) {
    const device = await DeviceModel.findByPk(id);
    return device; // có thể null nếu không tìm thấy
  }

  // Cập nhật 1 Company
  static async updateDevice(id, data) {
    //console.log('UpdateCompany - data:', data);
    const device = await DeviceModel.findByPk(id);
    if (!device) {
      return null;
    }

    await device.update(data);
    return device;
  }

  // Xóa 1 Company
  static async deleteDevice(id) {
    const device = await DeviceModel.findByPk(id);
    if (!device) {
      return null;
    }

    await device.destroy();
    return true;
  }
}

module.exports = DeviceService;
