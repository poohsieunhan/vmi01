const deviceStatusService = require("../services/devicestatus.service");
const { SuccessResponse } = require("../core/success.response");

class DeviceStatusController {
  //   createDevice = async (req, res, next) => {
  //     try {
  //       new SuccessResponse({
  //         message: "Device created successfully",
  //         metadata: await deviceService.createDevice(req.body),
  //       }).send(res);
  //     } catch (error) {
  //       const status = error.statusCode || 500;
  //       res.status(status).json({
  //         status: "error",
  //         message: error.message || "Internal Server Error",
  //       });
  //     }
  //   };

  getAllDeviceStatus = async (req, res, next) => {
    const { page, limit } = req.query;
    new SuccessResponse({
      message: "Labs retrieved successfully",
      metadata: await deviceStatusService.getAllDeviceStatus({
        page: Number(page) || 1,
        limit: Number(limit) || 20,
      }),
    }).send(res);
  };

  getAllDeviceStatusById = async (req, res, next) => {
    const { Id } = req.params;
    const device = await deviceStatusService.getDeviceStatusById(Id);
    new SuccessResponse({
      message: "Device Status retrieved successfully",
      metadata: device,
    }).send(res);
  };

  //   updateDevice = async (req, res, next) => {
  //     const { Id } = req.params;
  //     const updatedDevice = await deviceService.updateDevice(Id, req.body);
  //     new SuccessResponse({
  //       message: "Device updated successfully",
  //       metadata: updatedDevice,
  //     }).send(res);
  //   };

  //   deleteDevice = async (req, res, next) => {
  //     try {
  //       const { Id } = req.params;
  //       await deviceService.deleteDevice(Id);
  //       new SuccessResponse({
  //         message: "Device deleted successfully",
  //       }).send(res);
  //     } catch (error) {
  //       const status = error.statusCode || 500;
  //       res.status(status).json({
  //         status: "error",
  //         message: error.message || "Internal Server Error",
  //       });
  //     }
  //   };
}

module.exports = new DeviceStatusController();
