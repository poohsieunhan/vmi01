const RequestFormService = require("../services/requestform.service");
const { SuccessResponse } = require("../core/success.response");

class RequestFormController{
    createRequestForm = async (req, res, next) => {
    try {
        new SuccessResponse({
            message: "RequestForm created successfully",
            metadata: await RequestFormService.createRequestForm(req.body),
        }).send(res);
    } catch (error) {
        const status = error.statusCode || 500;
        res.status(status).json({
            status: "error",
            message: error.message || "Internal Server Error",
        });   
    }
}    
    getAllRequestForm = async (req, res, next) => {
        const { page, limit } = req.query;
        new SuccessResponse({
        message: "RequestForms retrieved successfully",
        metadata: await RequestFormService.getAllRequestForm({
            page: Number(page) || 1,
            limit: Number(limit) || 20,
        }),
        }).send(res);   
    }
}
module.exports = new RequestFormController();