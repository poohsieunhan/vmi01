// src/pages/CompanyListPage.jsx
import { useEffect, useState } from "react";
import companyApi from "../services/companyApi";
import toast from "react-hot-toast";
//import MyDataTable from "../components/company/CompanyTable"; // file cũ nhưng giờ export DataTable
import MyDataTable from "../components/common/MyDataTable";
import CompanyFormModal from "../components/company/CompanyFormModal";

function CompanyListPage() {
  const [companies, setCompanies] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // modal state
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create"); // 'create' | 'edit' | 'delete'
  const [selectedCompany, setSelectedCompany] = useState(null);

  // form state
  const [formData, setFormData] = useState(initialForm());
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function initialForm() {
    return {
      TenCongTy: "",
      DiaChi: "",
      MaSoThue: "",
      Email: "",
      Tel: "",
      Fax: "",
    };
  }

  const fetchCompanies = async ({ page = 1, limit = 10 } = {}) => {
    try {
      setLoading(true);
      setError("");
      const res = await companyApi.getAll({ page, limit }); // tuỳ backend
      setCompanies(res.data || []);
      setPagination(res.pagination || null);
    } catch (err) {
      console.error(err);
      setError("Không tải được danh sách công ty. Kiểm tra lại backend.");
      toast.error("Không tải được danh sách công ty.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies({ page: 1, limit: 10 });
  }, []);

  // mở/đóng modal
  const openCreate = () => {
    setMode("create");
    setSelectedCompany(null);
    setFormData(initialForm());
    setFormError("");
    setOpen(true);
  };

  const openEdit = (company) => {
    setMode("edit");
    setSelectedCompany(company);
    setFormData({
      TenCongTy: company.TenCongTy || "",
      DiaChi: company.DiaChi || "",
      MaSoThue: company.MaSoThue || "",
      Email: company.Email || "",
      Tel: company.Tel || "",
      Fax: company.Fax || "",
    });
    setFormError("");
    setOpen(true);
  };

  const openDelete = (company) => {
    setMode("delete");
    setSelectedCompany(company);
    setFormError("");
    setOpen(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setOpen(false);
    setSelectedCompany(null);
  };

  // form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    try {
      if (mode === "create") {
        if (!formData.TenCongTy.trim()) {
          setFormError("Tên công ty là bắt buộc.");
          setSubmitting(false);
          return;
        }
        try {
          await companyApi.add(formData);
          await fetchCompanies({ page: 1, limit: 10 });
          setOpen(false);
          toast.success("Thêm mới công ty thành công.");
        } catch (error) {
          const msg =
            error.response?.data?.message ||
            "Có lỗi xảy ra khi thêm mới công ty.";
          setFormError(msg);
          toast.error(msg);
        }
      }

      if (mode === "edit" && selectedCompany) {
        if (!formData.TenCongTy.trim()) {
          setFormError("Tên công ty là bắt buộc.");
          setSubmitting(false);
          return;
        }
        try {
          await companyApi.update(selectedCompany.Id, formData);
          await fetchCompanies({
            page: pagination?.page || 1,
            limit: pagination?.limit || 10,
          });
          setOpen(false);
          toast.success("Cập nhật công ty thành công.");
        } catch (error) {
          const msg =
            error.response?.data?.message ||
            "Có lỗi xảy ra khi cập nhật công ty.";
          setFormError(msg);
          toast.error(msg);
        }
      }

      if (mode === "delete" && selectedCompany) {
        try {
          await companyApi.delete(selectedCompany.Id);
          await fetchCompanies({
            page: 1,
            limit: pagination?.limit || 10,
          });
          setOpen(false);
          toast.success("Xóa công ty thành công.");
        } catch (error) {
          const msg =
            error.response?.data?.message || "Có lỗi xảy ra khi xóa công ty.";
          setFormError(msg);
          toast.error(msg);
        }
      }
    } catch (err) {
      console.error(err);
      setFormError("Có lỗi xảy ra khi lưu dữ liệu. Kiểm tra lại backend.");
      toast.error("Có lỗi xảy ra khi lưu dữ liệu.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangePage = (page) => {
    fetchCompanies({ page, limit: pagination?.limit || 10 });
  };

  // ==== ĐỊNH NGHĨA CỘT CHO DataTable ====
  const columns = [
    {
      id: "Id",
      header: "ID",
      accessor: "Id",
      thClassName: "whitespace-nowrap",
      tdClassName: "whitespace-nowrap",
    },
    {
      id: "TenCongTy",
      header: "TÊN CÔNG TY",
      accessor: "TenCongTy",
    },
    {
      id: "DiaChi",
      header: "ĐỊA CHỈ",
      accessor: "DiaChi",
      tdClassName: "whitespace-normal break-words",
    },
    {
      id: "MaSoThue",
      header: "MÃ SỐ THUẾ",
      accessor: "MaSoThue",
      thClassName: "whitespace-nowrap",
      tdClassName: "whitespace-nowrap",
    },
    {
      id: "Email",
      header: "EMAIL",
      accessor: "Email",
      tdClassName: "break-all",
    },
    {
      id: "Tel",
      header: "TEL",
      accessor: "Tel",
      thClassName: "whitespace-nowrap",
      tdClassName: "whitespace-nowrap",
    },
    {
      id: "Fax",
      header: "FAX",
      accessor: "Fax",
      thClassName: "whitespace-nowrap",
      tdClassName: "whitespace-nowrap",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-sm p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">
                Danh sách Công ty
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Quản lý thông tin công ty: tên, địa chỉ, mã số thuế, liên hệ…
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={openCreate}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow hover:bg-indigo-700 transition"
              >
                + Thêm công ty
              </button>
            </div>
          </div>

          {/* Nội dung */}
          {loading && (
            <div className="py-10 text-center text-slate-500">
              Đang tải dữ liệu...
            </div>
          )}

          {!loading && error && (
            <div className="py-4 text-sm text-rose-600">{error}</div>
          )}

          {!loading && !error && (
            <MyDataTable
              columns={columns}
              data={companies}
              pagination={pagination}
              onChangePage={handleChangePage}
              actionsHeader="THAO TÁC"
              renderActions={(company) => (
                <>
                  <button
                    type="button"
                    onClick={() => openEdit(company)}
                    className="px-3 py-1 text-xs font-medium rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => openDelete(company)}
                    className="px-3 py-1 text-xs font-medium rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Remove
                  </button>
                </>
              )}
            />
          )}
        </div>
      </div>

      {/* Modal form */}
      <CompanyFormModal
        open={open}
        mode={mode}
        formData={formData}
        formError={formError}
        submitting={submitting}
        selectedCompany={selectedCompany}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClose={closeModal}
      />
    </div>
  );
}

export default CompanyListPage;
