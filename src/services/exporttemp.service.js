const XLSX = require("xlsx");

class ExportTempService {
  static generateTemplate() {
    // Dữ liệu mẫu
    const sample = [
      {
        TenCongTy: "Công ty mẫu ABC",
        DiaChi: "Hà Nội",
        MaSoThue: "0123456",
        Email: "contact@abc.com",
        Tel: "0900000000",
        Fax: "0240000000",
        NguoiDaiDien: "Nguyễn Văn A",
        ChucVu: "Giám đốc",
      },
    ];

    // Tạo worksheet
    const ws = XLSX.utils.json_to_sheet(sample);

    // Tạo workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");

    // Trả về buffer
    return XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
  }
}

module.exports = ExportTempService;
