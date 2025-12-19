const express = require("express");
const dashboardController = require("../../controllers/dashboard.controller");
const asyncHandler = require("../../helpers/asyncHandler.js");
const router = express.Router();

// router.use(apiKey);
// router.use(checkPermission('0000'));

router.get("/summary", asyncHandler(dashboardController.getRFSummary));
router.post(
  "/inspec-stats",
  asyncHandler(dashboardController.getInspectionStats)
);
// router.get("/:Id", asyncHandler(companyController.getCompanyById));
// router.post("", asyncHandler(companyController.createCompany));
// router.put("/:Id", asyncHandler(companyController.updateCompany));
// router.delete("/:Id", asyncHandler(companyController.deleteCompany));

module.exports = router;
