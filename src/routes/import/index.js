const express = require("express");
const importCompanyController = require("../../controllers/importcompany.controller");
const asyncHandler = require("../../helpers/asyncHandler.js");
const uploadExcel = require("../../ultis/uploadExcel");
const router = express.Router();

// router.use(apiKey);
// router.use(checkPermission('0000'));

//router.get("/rf/:Id", asyncHandler(exportController.exportWord));
router.post(
  "/importCompany",
  uploadExcel.single("file"),
  asyncHandler(importCompanyController)
);
// router.post("", asyncHandler(deviceController.createDevice));
// router.put("/:Id", asyncHandler(deviceController.updateDevice));
// router.delete("/:Id", asyncHandler(deviceController.deleteDevice));

module.exports = router;
