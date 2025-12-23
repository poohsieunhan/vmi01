const { SuccessResponse } = require("../core/success.response");
const dashboardService = require("../services/dashboard.service");

class DashboardController {
  getRFSummary = async (req, res, next) => {
    const { fromDate, toDate } = req.query;
    const data = {
      fromDate,
      toDate,
    };
    const summary = await dashboardService.getRFSummary(data);
    new SuccessResponse({
      message: "Dashboard summary retrieved successfully",
      metadata: summary,
    }).send(res);
  };

  getInspectionStats = async (req, res, next) => {
    const { fromDate, toDate } = req.body.params;
    console.log("Controller received data:", req.body.params);
    const data = {
      fromDate,
      toDate,
    };
    console.log("Controller processed data:", data);
    const stats = await dashboardService.getInspectionStats(data);
    new SuccessResponse({
      message: "Inspection stats retrieved successfully",
      metadata: stats,
    }).send(res);
  };
}

module.exports = new DashboardController();
