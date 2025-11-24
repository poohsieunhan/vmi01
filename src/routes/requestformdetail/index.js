const express = require("express");
const requestFormDetailController = require("../../controllers/requestformdetail.controller");
const asyncHandler = require("../../helpers/asyncHandler.js");
const router = express.Router();

// router.use(apiKey);
// router.use(checkPermission('0000'));

//router.get("", asyncHandler(requestFormController.getAllRequestForm));
router.get("/:Id", asyncHandler(requestFormDetailController.getRfdById));
router.post(
  "",
  asyncHandler(requestFormDetailController.createRequestFormDetail)
);
router.put(
  "/:Id",
  asyncHandler(requestFormDetailController.updateRequestFormDetail)
);
router.delete(
  "/:Id",
  asyncHandler(requestFormDetailController.deleteRequestFormDetail)
);

module.exports = router;
