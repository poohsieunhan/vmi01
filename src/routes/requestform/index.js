const express = require("express");
const requestFormController = require("../../controllers/requestform.controller");
const asyncHandler = require("../../helpers/asyncHandler.js");
const router = express.Router();

// router.use(apiKey);
// router.use(checkPermission('0000'));

router.get("", asyncHandler(requestFormController.getAllRequestForm));
router.get(
  "/:SoPhieu",
  asyncHandler(requestFormController.getRequestFormBySoPhieu)
);
router.get("/rfid/:Id", asyncHandler(requestFormController.getRequestFormById));
router.post("", asyncHandler(requestFormController.createRequestForm));
router.put("/:Id", asyncHandler(requestFormController.updateRequestForm));
router.delete("/:Id", asyncHandler(requestFormController.deleteRequestForm));

module.exports = router;
