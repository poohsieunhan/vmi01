const express = require("express");
const companyController = require("../../controllers/company.controller");
const asyncHandler = require("../../helpers/asyncHandler.js");
const router = express.Router();

// router.use(apiKey);
// router.use(checkPermission('0000'));

router.get("", asyncHandler(companyController.getAllCompanies));
router.post("", asyncHandler(companyController.createCompany));

module.exports = router;
