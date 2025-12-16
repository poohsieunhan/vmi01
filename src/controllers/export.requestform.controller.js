const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

//const RequestForm = require("../models/requestform.model");
//const RequestFormDetail = require("../models/requestformdetail.model");
const CompanyModel = require("../models/company.model");
const { RequestFormDetail, RequestForm } = require("../models");
const Device = require("../models/device.model");
const DeviceStatus = require("../models/devicestatus.model");
const Lab = require("../models/lab.model");
const { convertCheckbox } = require("../ultis");

function formatDateDDMMYYYY(date) {
  if (!date) return "";
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

exports.exportWord = async (req, res, next) => {
  try {
    console.log("req.params =", req.params);
    const id = Number(req.params.Id);
    console.log("id sau Number =", id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "Id phiếu không hợp lệ" });
    }

    // TODO: đảm bảo bạn đã khai báo association ở đâu đó, ví dụ:
    // RequestForm.hasMany(RequestFormDetail, { as: "Details", foreignKey: "RequestFormId" });
    // RequestForm.belongsTo(Company, { as: "CongTy", foreignKey: "CongTyId" });
    // RequestForm.belongsTo(Company, { as: "CongTySuDung", foreignKey: "CongTySuDungId" });
    // RequestFormDetail.belongsTo(Device, { as: "Device", foreignKey: "ThietBiId" });
    // RequestFormDetail.belongsTo(DeviceStatus, { as: "DeviceStatus", foreignKey: "TrangThaiThietBiId" });
    // RequestFormDetail.belongsTo(Lab, { as: "Lab", foreignKey: "LabId" });

    //Lay du lieu phieu tu DB
    const requestForm = await RequestForm.findByPk(id, {
      include: [
        {
          model: RequestFormDetail,
          as: "Details",
          include: [
            {
              model: Device,
              as: "ThietBiText",
              attributes: ["Id", "TenThietBi"],
            },
            {
              model: DeviceStatus,
              as: "TrangThaiThietBiText",
              attributes: ["Id", "TenTrangThai"],
            },
            {
              model: Lab,
              as: "LabText",
              attributes: ["Id", "TenPhongBan"],
            },
          ],
        },
        {
          model: CompanyModel,
          as: "CongTy",
          attributes: [
            "Id",
            "TenCongTy",
            "DiaChi",
            "MaSoThue",
            "Tel",
            "Email",
            "Fax",
          ],
        },
        {
          model: CompanyModel,
          as: "CongTySuDung",
          attributes: ["Id", "TenCongTy", "DiaChi"],
        },
      ],
    });

    if (!requestForm) {
      return res.status(404).json({ message: "Không tìm thấy phiếu" });
    }
    console.log("Details length:", requestForm.Details?.length);
    console.log("Details data:", JSON.stringify(requestForm.Details, null, 2));
    console.log("Details data:", JSON.stringify(requestForm.CongTy, null, 2));
    console.log(
      "Details data:",
      JSON.stringify(requestForm.CongTySuDung, null, 2)
    );
    // Chuẩn hóa dữ liệu cho template
    const dataForDoc = {
      // HEADER
      SoPhieu: requestForm.SoPhieu,
      NgayNhan: formatDateDDMMYYYY(requestForm.NgayNhan),
      NgayTraDuKien: formatDateDDMMYYYY(requestForm.NgayTraDuKien),
      NgayTraThucTe: formatDateDDMMYYYY(requestForm.NgayTraThucTe),
      NgayPDLTraMau: formatDateDDMMYYYY(
        requestForm.NgayTraDuKien || requestForm.NgayTraThucTe
      ),

      // Thông tin công ty
      TenCongTy: requestForm.CongTy?.TenCongTy || "",
      DiaChi: requestForm.CongTy?.DiaChi || "",
      MaSoThue: requestForm.CongTy?.MaSoThue || "",
      Tel: requestForm.CongTy?.Tel || "",
      Email: requestForm.CongTy?.Email || "",
      Fax: requestForm.CongTy?.Fax || "",

      TenCongTySuDungText: requestForm.CongTySuDung?.TenCongTy || "",
      CongTySuDungDiaChi: requestForm.CongTySuDung?.DiaChi || "",

      // Checkbox: true => in chữ "X"
      ThucHienTaiVMI: convertCheckbox(requestForm.ThucHienTaiVMI),
      //requestForm.ThucHienTai ? "X" : "",
      ThucHienTaiCoSo: convertCheckbox(requestForm.CoSo),
      YeuCauGiay: convertCheckbox(requestForm.YeuCauGiay),
      YeuCauHieuChinh: convertCheckbox(requestForm.YeuCauHieuChinh),
      YeuCauPhuongPhap: convertCheckbox(requestForm.YeuCauPhuongPhap),
      GiaoNhanTrucTiep: convertCheckbox(requestForm.HinhThucGiaoNhan),
      GiaoNhanGianTiep: convertCheckbox(!requestForm.HinhThucGiaoNhan),

      SoBG: requestForm.SoBG || "",

      // DETAILS
      details: (requestForm.Details || []).map((d, index) => ({
        stt: index + 1,
        TenThietBi:
          d.ThietBiText?.TenThietBi || `Thiết bị ${d.ThietBiId ?? ""}`.trim(),
        ThietBiSerial: d.ThietBiSerial || "",
        SoLuong: d.SoLuong,
        TenTrangThaiThietBi: d.TrangThaiThietBiText?.TenTrangThai || "",
        HC: convertCheckbox(d.isHC),
        KD: convertCheckbox(d.isKD),
        DTN: convertCheckbox(d.isDTN),
        Khac: convertCheckbox(d.isKhac),
        TenLab: d.LabText?.TenPhongBan || "",
        GhiChu: d.GhiChu || "",
      })),
    };

    // Đọc file template
    const templatePath = path.resolve(
      __dirname,
      "../templates/Phieu-tiep-nhan-v1.docx"
    );
    const content = fs.readFileSync(templatePath, "binary");

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    try {
      doc.render(dataForDoc);
    } catch (error) {
      console.error("Lỗi render docx:", error);
      return res.status(500).json({ message: "Lỗi khi sinh file Word" });
    }

    //Xuat File
    const buf = doc.getZip().generate({ type: "nodebuffer" });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Phieu-tiep-nhan-v1.docx`
    );

    return res.send(buf);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Lỗi export phiếu",
      detail: err.message,
    });
  }
};
