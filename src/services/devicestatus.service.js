// services/company.service.js
const DeviceStatusModel = require("../models/devicestatus.model");
const { ErrorResponse, BadRequestError } = require("../core/error.response");

class DeviceStatusService {
  static async createDeviceStatus(data) {
    const tenTrangThai = data.TenTrangThai;
    const foundDS = await DeviceStatusModel.findOne({
      where: { TenTrangThai: tenTrangThai },
    });
    if (foundDS) {
      throw new ErrorResponse("DS with this TenTrangThai already exists.");
    }

    const ds = await DeviceStatusModel.create(data);
    return ds;
  }

  static async getAllDeviceStatus({ page = 1, limit = 20 } = {}) {
    const offset = (page - 1) * limit;

    const { rows, count } = await DeviceStatusModel.findAndCountAll({
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

  static async getDeviceStatusById(id) {
    const ds = await DeviceStatusModel.findByPk(id);
    return ds;
  }

  static async updateDeviceStatus(id, data) {
    const ds = await DeviceStatusModel.findByPk(id);
    if (!lab) {
      return null;
    }

    await ds.DeviceStatusModel(data);
    return ds;
  }

  static async deleteDeviceStatus(id) {
    const ds = await DeviceStatusModel.findByPk(id);
    if (!ds) {
      return null;
    }

    await ds.destroy();
    return true;
  }
}

module.exports = DeviceStatusService;
