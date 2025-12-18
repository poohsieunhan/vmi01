"use strict";

const express = require("express");
const router = express.Router();

//router.use('/api/v1', require('./access'))
router.use("/api/v1/company", require("./company"));
router.use("/api/v1/device", require("./device"));
router.use("/api/v1/requestform", require("./requestform"));
router.use("/api/v1/requestformdetail", require("./requestformdetail"));
router.use("/api/v1/lab", require("./lab")); // Import lab routes
router.use("/api/v1/devicestatus", require("./devicestatus"));
router.use("/api/v1/export", require("./export"));
router.use("/api/v1/import", require("./import"));
router.use("/api/v1/dashboard", require("./dashboard"));

module.exports = router;
