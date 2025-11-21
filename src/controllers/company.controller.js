// controllers/company.controller.js
const companyService = require("../services/company.service");
const { SuccessResponse } = require("../core/success.response");

class CompanyController {
  createCompany = async (req, res, next) => {
    //const inputData = req.body;
    // console.log('CreateCompany - HEADERS:', req.headers);
    // console.log('CreateCompany - RAW_BODY:', req.rawBody);
    // console.log('CreateCompany - BODY:', inputData);
    new SuccessResponse({
      message: "Company created successfully",
      metadata: await companyService.createCompany(req.body),
    }).send(res);
  };

  getAllCompanies = async (req, res, next) => {
    const { page, limit } = req.query;
    new SuccessResponse({
      message: "Companies retrieved successfully",
      metadata: await companyService.getAllCompanies({
        page: Number(page) || 1,
        limit: Number(limit) || 20,
      }),
    }).send(res);
  };

  getCompanyById = async (req, res, next) => {
    const { id } = req.params;
    const company = await companyService.getCompanyById(id);
    new SuccessResponse({
      message: "Company retrieved successfully",
      metadata: company,
    }).send(res);
  };
}

module.exports = new CompanyController();
