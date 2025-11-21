"use strict";

const express = require("express");
const router = express.Router();

//router.use('/api/v1', require('./access')) // Import access routes
router.use("/api/v1/company", require("./company")); // Import cart routes

module.exports = router;
