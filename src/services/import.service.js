const XLSX = require("xlsx");
const CompanyModel = require("../models/company.model");

class ImportService {
  static async importCompany(buffer) {
    // Đọc file từ buffer
    const workbook = XLSX.read(buffer, { type: "buffer" });
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
      const existingCompany = CompanyModel.findOne({
        where: { MaSoThue: item.MaSoThue },
      });
      console.log("existingCompany:", item.MaSoThue);
      // Validate cơ bản
      if (!item.TenCongTy) {
        errors.push(`Dòng ${index + 2}: Thiếu TenCongTy`);
        return;
      }
      if (existingCompany) {
        errors.push(`Dòng ${index + 2}: Mã số thuế đã tồn tại`);
        return;
      } else {
        insertData.push(item);
      }
    });

    if (insertData.length) {
      await CompanyModel.bulkCreate(insertData);
    }

    return {
      total: rows.length,
      inserted: insertData.length,
      errors,
    };
  }
}

module.exports = ImportService;
