const express = require("express");
const requestFormController = require("../../controllers/requestform.controller");
const asyncHandler = require("../../helpers/asyncHandler.js");
const router = express.Router();

// router.use(apiKey);
// router.use(checkPermission('0000'));

router.get("", asyncHandler(requestFormController.getAllRequestForm));
//router.get("/:Id", asyncHandler(deviceController.getDeviceById));
router.post("", asyncHandler(requestFormController.createRequestForm));
//router.put("/:Id", asyncHandler(deviceController.updateDevice));
//router.delete("/:Id", asyncHandler(deviceController.deleteDevice));

module.exports = router;
