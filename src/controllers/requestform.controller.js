const RequestFormService = require("../services/requestform.service");
const { SuccessResponse } = require("../core/success.response");

class RequestFormController {
  createRequestForm = async (req, res, next) => {
    try {
      new SuccessResponse({
        message: "RequestForm created successfully",
        metadata: await RequestFormService.createRequestForm(req.body),
      }).send(res);
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({
        status: "error",
        message: error.message || "Internal Server Error",
      });
    }
  };
  getAllRequestForm = async (req, res, next) => {
    const { page, limit } = req.query;
    new SuccessResponse({
      message: "RequestForms retrieved successfully",
      metadata: await RequestFormService.getAllRequestForm({
        page: Number(page) || 1,
        limit: Number(limit) || 20,
      }),
    }).send(res);
  };

  getRequestFormBySoPhieu = async (req, res, next) => {
    const { SoPhieu } = req.params;
    console.log("SoPhieu:", SoPhieu);
    const rf = await RequestFormService.getRfBySoPhieu(SoPhieu);
    new SuccessResponse({
      message: "RequestForm retrieved successfully",
      metadata: rf,
    }).send(res);
  };

  updateRequestForm = async (req, res, next) => {
    try {
      const { Id } = req.params;
      //console.log("UpdateRequestForm - Id:", Id);
      //console.log("UpdateRequestForm - Body:", req.body);
      const updatedRf = await RequestFormService.updateRequestForm(
        Id,
        req.body
      );
      new SuccessResponse({
        message: "RequestForm updated successfully",
        metadata: updatedRf,
      }).send(res);
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({
        status: "error",
        message: error.message || "Internal Server Error",
      });
    }
  };

  getRequestFormById = async (req, res, next) => {
    try {
      const { Id } = req.params;
      const rf = await RequestFormService.getRfById(Id);
      new SuccessResponse({
        message: "RequestForm retrieved successfully",
        metadata: rf,
      }).send(res);
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({
        status: "error",
        message: error.message || "Internal Server Error",
      })
    }
  }

  deleteRequestForm = async (req, res, next) => {
    try {
      const { Id } = req.params;
      await RequestFormService.deleteRequestForm(Id);
      new SuccessResponse({
        message: "RequestForm deleted successfully",
      }).send(res);
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({
        status: "error",
        message: error.message || "Internal Server Error",
      });
    }
  };
}
module.exports = new RequestFormController();
