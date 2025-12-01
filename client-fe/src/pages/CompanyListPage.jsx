// src/pages/CompanyListPage.jsx
import { useEffect, useState } from "react";
import companyApi from "../services/companyApi";
import Modal from "../components/Modal";
import { thStyle, tdStyle } from "../components/tableStyles";
import toast from "react-hot-toast";

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
      const res = await companyApi.getAll();
      setCompanies(res.data || []);
      setPagination(res.pagination || null);
    } catch (err) {
      console.error(err);
      setError("Không tải được danh sách công ty. Kiểm tra lại backend.");
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

        await companyApi.add(formData); // Changed from 'create' to 'add'
        await fetchCompanies({ page: 1, limit: 10 });
        setOpen(false);
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
          toast.error(msg);
        }
      }

      if (mode === "delete" && selectedCompany) {
        await companyApi.delete(selectedCompany.Id); // Changed from 'remove' to 'delete'
        await fetchCompanies({
          page: 1,
          limit: pagination?.limit || 10,
        });
        setOpen(false);
      }
    } catch (err) {
      console.error(err);
      setFormError("Có lỗi xảy ra khi lưu dữ liệu. Kiểm tra lại backend.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Danh sách Công ty</h1>

      <div style={{ margin: "12px 0" }}>
        <button onClick={openCreate}>+ Thêm công ty</button>
      </div>

      {loading && <p>Đang tải...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "8px",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Tên công ty</th>
                <th style={thStyle}>Địa chỉ</th>
                <th style={thStyle}>Mã số thuế</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Tel</th>
                <th style={thStyle}>Fax</th>
                <th style={thStyle}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c) => (
                <tr key={c.Id}>
                  <td style={tdStyle}>{c.Id}</td>
                  <td style={tdStyle}>{c.TenCongTy}</td>
                  <td style={tdStyle}>{c.DiaChi}</td>
                  <td style={tdStyle}>{c.MaSoThue}</td>
                  <td style={tdStyle}>{c.Email}</td>
                  <td style={tdStyle}>{c.Tel}</td>
                  <td style={tdStyle}>{c.Fax}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => openEdit(c)}
                      style={{ marginRight: 8 }}
                    >
                      Edit
                    </button>
                    <button onClick={() => openDelete(c)}>Delete</button>
                  </td>
                </tr>
              ))}

              {companies.length === 0 && (
                <tr>
                  <td style={tdStyle} colSpan={8}>
                    Không có dữ liệu.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {pagination && (
            <div
              style={{
                marginTop: "12px",
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <button
                disabled={pagination.page <= 1}
                onClick={() =>
                  fetchCompanies({
                    page: pagination.page - 1,
                    limit: pagination.limit,
                  })
                }
              >
                Trang trước
              </button>
              <span>
                Trang {pagination.page} / {pagination.totalPages}
              </span>
              <button
                disabled={pagination.page >= pagination.totalPages}
                onClick={() =>
                  fetchCompanies({
                    page: pagination.page + 1,
                    limit: pagination.limit,
                  })
                }
              >
                Trang sau
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal dùng chung */}
      <Modal
        open={open}
        title={
          mode === "create"
            ? "Thêm công ty"
            : mode === "edit"
            ? "Chỉnh sửa công ty"
            : "Xóa công ty"
        }
        onClose={closeModal}
      >
        {mode === "delete" && selectedCompany ? (
          <form onSubmit={handleSubmit}>
            <p>
              Bạn có chắc chắn muốn xóa công ty{" "}
              <strong>{selectedCompany.TenCongTy}</strong> (ID:{" "}
              {selectedCompany.Id})?
            </p>
            {formError && <p style={{ color: "red" }}>{formError}</p>}
            <div
              style={{
                marginTop: 16,
                display: "flex",
                gap: 8,
                justifyContent: "flex-end",
              }}
            >
              <button type="button" onClick={closeModal} disabled={submitting}>
                Hủy
              </button>
              <button type="submit" disabled={submitting}>
                {submitting ? "Đang xóa..." : "Xóa"}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <InputField
                label="Tên công ty (*)"
                name="TenCongTy"
                value={formData.TenCongTy}
                onChange={handleChange}
              />
              <InputField
                label="Địa chỉ"
                name="DiaChi"
                value={formData.DiaChi}
                onChange={handleChange}
              />
              <InputField
                label="Mã số thuế"
                name="MaSoThue"
                value={formData.MaSoThue}
                onChange={handleChange}
              />
              <InputField
                label="Email"
                name="Email"
                type="email"
                value={formData.Email}
                onChange={handleChange}
              />
              <InputField
                label="Tel"
                name="Tel"
                value={formData.Tel}
                onChange={handleChange}
              />
              <InputField
                label="Fax"
                name="Fax"
                value={formData.Fax}
                onChange={handleChange}
              />
            </div>

            {formError && (
              <p style={{ color: "red", marginTop: 8, marginBottom: 0 }}>
                {formError}
              </p>
            )}

            <div
              style={{
                marginTop: 16,
                display: "flex",
                gap: 8,
                justifyContent: "flex-end",
              }}
            >
              <button type="button" onClick={closeModal} disabled={submitting}>
                Hủy
              </button>
              <button type="submit" disabled={submitting}>
                {submitting
                  ? "Đang lưu..."
                  : mode === "create"
                  ? "Tạo mới"
                  : "Lưu thay đổi"}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}

// small input component để form ngắn gọn hơn
function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label>
        {label}
        <br />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          style={{ width: "100%" }}
        />
      </label>
    </div>
  );
}

export default CompanyListPage;
