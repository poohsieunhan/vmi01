const express = require("express");
const deviceStatusController = require("../../controllers/devicestatus.controller");
const asyncHandler = require("../../helpers/asyncHandler.js");
const router = express.Router();

// router.use(apiKey);
// router.use(checkPermission('0000'));

router.get("", asyncHandler(deviceStatusController.getAllDeviceStatus));
router.get("/:Id", asyncHandler(deviceStatusController.getAllDeviceStatusById));
// router.post("", asyncHandler(deviceController.createDevice));
// router.put("/:Id", asyncHandler(deviceController.updateDevice));
// router.delete("/:Id", asyncHandler(deviceController.deleteDevice));

module.exports = router;
