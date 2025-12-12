const XLSX = require("xlsx");
const ImportService = require("../services/import.service");

class ImportController {
  static importCompany = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Không có file được upload" });
      }

      const result = await ImportService.importCompany(req.file.buffer);

      return res.json({
        message: "Import hoàn tất",
        ...result,
      });
    } catch (err) {
      console.error("Lỗi import Excel:", err);
      return res.status(500).json({
        message: "Lỗi import Excel",
        detail: err.message,
      });
    }
  };
}

module.exports = ImportController;
