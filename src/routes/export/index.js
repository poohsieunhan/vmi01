const express = require("express");
const exportController = require("../../controllers/export.requestform.controller");
const asyncHandler = require("../../helpers/asyncHandler.js");
const router = express.Router();

// router.use(apiKey);
// router.use(checkPermission('0000'));

router.get("/rf/:Id", asyncHandler(exportController.exportWord));
// router.get("/:Id", asyncHandler(deviceController.getDeviceById));
// router.post("", asyncHandler(deviceController.createDevice));
// router.put("/:Id", asyncHandler(deviceController.updateDevice));
// router.delete("/:Id", asyncHandler(deviceController.deleteDevice));

module.exports = router;
