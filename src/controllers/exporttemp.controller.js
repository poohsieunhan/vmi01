const ExportTempService = require("../services/exporttemp.service");
const { SuccessResponse } = require("../core/success.response");

class ExportTempController {
  ExportTempCompany = async (req, res, next) => {
    try {
      const buffer = ExportTempService.generateTemplate();

      res.setHeader(
        "Content-Disposition",
        "attachment; filename=company_template.xlsx"
      );
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      return res.send(buffer);
    } catch (error) {
      console.error("Lỗi download template:", error);
      return res.status(500).json({ message: "Lỗi tạo template Excel" });
    }
  };
}

module.exports = new ExportTempController();
