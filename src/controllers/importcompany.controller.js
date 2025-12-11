const XLSX = require("xlsx");
const CompanyModel = require("../models/company.model");

const ImportCompanyController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Không có file được upload" });
    }

    // Đọc file từ buffer
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const rows = XLSX.utils.sheet_to_json(sheet);

    if (!rows.length) {
      return res.status(400).json({ message: "File Excel không có dữ liệu" });
    }

    const insertData = [];
    const errors = [];

    rows.forEach((row, index) => {
      const item = {
        TenCongTy: row["TenCongTy"],
        MaSoThue: row["MaSoThue"],
        DiaChi: row["DiaChi"],
        Tel: row["Tel"],
        Email: row["Email"],
        Fax: row["Fax"],
        NguoiDaiDien: row["NguoiDaiDien"],
        ChucVu: row["ChucVu"],
      };

      // Validate cơ bản
      if (!item.TenCongTy) {
        errors.push(`Dòng ${index + 2}: Thiếu TenCongTy`);
      } else {
        insertData.push(item);
      }
    });

    if (insertData.length) {
      await CompanyModel.bulkCreate(insertData);
    }

    return res.json({
      message: "Import hoàn tất",
      total: rows.length,
      inserted: insertData.length,
      errors,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Lỗi import Excel" });
  }
};

module.exports = ImportCompanyController;
