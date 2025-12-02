// src/components/company/CompanyFormModal.jsx
import Modal from "../Modal";

function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
}

function CompanyFormModal({
  open,
  mode,
  formData,
  formError,
  submitting,
  selectedCompany,
  onChange,
  onSubmit,
  onClose,
}) {
  const title =
    mode === "create"
      ? "Thêm công ty"
      : mode === "edit"
      ? "Chỉnh sửa công ty"
      : "Xóa công ty";

  return (
    <Modal open={open} title={title} onClose={onClose}>
      {mode === "delete" && selectedCompany ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <p className="text-sm text-slate-700">
            Bạn có chắc chắn muốn xóa công ty{" "}
            <span className="font-semibold">{selectedCompany.TenCongTy}</span>{" "}
            (ID: {selectedCompany.Id})?
          </p>
          {formError && <p className="text-sm text-rose-600">{formError}</p>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 text-sm rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-sm rounded-lg bg-rose-500 text-white hover:bg-rose-600 disabled:opacity-50"
            >
              {submitting ? "Đang xóa..." : "Xóa"}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <InputField
            label="Tên công ty (*)"
            name="TenCongTy"
            value={formData.TenCongTy}
            onChange={onChange}
          />
          <InputField
            label="Địa chỉ"
            name="DiaChi"
            value={formData.DiaChi}
            onChange={onChange}
          />
          <InputField
            label="Mã số thuế"
            name="MaSoThue"
            value={formData.MaSoThue}
            onChange={onChange}
          />
          <InputField
            label="Email"
            name="Email"
            type="email"
            value={formData.Email}
            onChange={onChange}
          />
          <InputField
            label="Tel"
            name="Tel"
            value={formData.Tel}
            onChange={onChange}
          />
          <InputField
            label="Fax"
            name="Fax"
            value={formData.Fax}
            onChange={onChange}
          />

          {formError && <p className="text-sm text-rose-600">{formError}</p>}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 text-sm rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
            >
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
  );
}

export default CompanyFormModal;
