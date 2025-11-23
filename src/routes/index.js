"use strict";

const express = require("express");
const router = express.Router();

//router.use('/api/v1', require('./access')) // Import access routes
router.use("/api/v1/company", require("./company")); // Import cart routes
router.use("/api/v1/device", require("./device")); // Import device routes
router.use("/api/v1/requestform", require("./requestform")); // Import requestform routes

module.exports = router;
