"use strict";

const express = require("express");
const router = express.Router();

//router.use('/api/v1', require('./access')) // Import access routes
router.use("/api/v1/company", require("./company")); // Import cart routes
router.use("/api/v1/device", require("./device")); // Import device routes
router.use("/api/v1/requestform", require("./requestform")); // Import requestform routes
router.use("/api/v1/requestformdetail", require("./requestformdetail")); // Import requestformdetail routes
router.use("/api/v1/lab", require("./lab")); // Import lab routes
router.use("/api/v1/devicestatus", require("./devicestatus")); // Import devicestatus routes

module.exports = router;
