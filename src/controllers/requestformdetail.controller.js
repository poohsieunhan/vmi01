"use strict";

const RequestFormDetailService = require("../services/requestformdetail.service");
const { SuccessResponse } = require("../core/success.response");

class RequestFormDetailController {
  createRequestFormDetail = async (req, res, next) => {
    try {
      new SuccessResponse({
        message: "RequestFormDetail created successfully",
        metadata: await RequestFormDetailService.createRequestFormDetail(
          req.body
        ),
      }).send(res);
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({
        status: "error",
        message: error.message || "Internal Server Error",
      });
    }
  };

  getRfdById = async (req, res, next) => {
    const { Id } = req.params;
    const rfd = await RequestFormDetailService.getRfdById(Id);
    new SuccessResponse({
      message: "RequestFormDetail retrieved successfully",
      metadata: rfd,
    }).send(res);
  };

  getRFDByRFId = async (req, res, next) => {
    const { RequestFormId } = req.params;
    const rfd = await RequestFormDetailService.getRFDByRFId(RequestFormId);
    new SuccessResponse({
      message: "RequestFormDetail retrieved successfully",
      metadata: rfd,
    }).send(res);
  };

  updateRequestFormDetail = async (req, res, next) => {
    const { Id } = req.params;
    const updatedRfd = await RequestFormDetailService.updateRequestFormDetail(
      Id,
      req.body
    );
    new SuccessResponse({
      message: "RequestFormDetail updated successfully",
      metadata: updatedRfd,
    }).send(res);
  };

  deleteRequestFormDetail = async (req, res, next) => {
    try {
      const { Id } = req.params;
      await RequestFormDetailService.deleteRequestFormDetail(Id);
      new SuccessResponse({
        message: "RequestFormDetail deleted successfully",
      }).send(res);
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({
        status: "error",
        message: error.message || "Internal Server Error",
      });
    }
  };
}

module.exports = new RequestFormDetailController();
