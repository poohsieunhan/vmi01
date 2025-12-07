import MyDataTable from "../components/common/MyDataTable";
import RequestFormModal from "../components/requestform/RequestFormModal"
import MySearchInput from "../components/common/MySearchInput";
import { useRequest } from "../hooks/requestform/useRequest"
import { useRequestForm } from "../hooks/requestform/useRequestForm"
import { requestFormColumns } from "../components/requestform/requestFormColumns";
import { useState, useEffect } from "react";
import companyApi from "../services/companyApi";
import { useNavigate } from "react-router-dom";

function RequestFormPage() {
  const {
    requestForms,
    filteredRequestForms,
    pagination,
    loading,
    error,
    searchText,
    setSearchText,
    fetchRequestForms,
    handleChangePage,
  } = useRequest(1, 10);

  const {
    open,
    mode,
    selectedRequestForm,
    formData,
    formError,
    submitting,
    openCreate,
    openEdit,
    openDelete,
    closeModal,
    handleChange,
    handleSubmit,
  } = useRequestForm({ fetchRequestForms });

  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const result = await companyApi.getAll({ page: 1, limit: 1000 });
        setCompanies(result.data || []); 
        console.log(result)
      } catch (err) {
        console.error("Failed to load companies", err);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <div className="w-full">
        <div className="bg-white shadow-sm p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">
                Danh sách Phiếu
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Quản lý thông tin Phiếu: tên, mã thiết bị…
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MySearchInput
                value={searchText}
                onChange={setSearchText}
                onClear={() => setSearchText("")}
                placeholder="Tìm theo số phiếu, ngày nhận..."
              />
              <button
                onClick={openCreate}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow hover:bg-indigo-700 transition"
              >
                + Thêm Phiếu
              </button>
            </div>
          </div>

          {/* Body */}
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
              columns={requestFormColumns}
              data={filteredRequestForms}
              pagination={pagination}
              onChangePage={handleChangePage}
              actionsHeader="THAO TÁC"
              renderActions={(requestForm) => (
                <>
                <button
                    type="button"
                    onClick={() => navigate(`/requestformdetail/${requestForm.Id}`)}
                    className="px-3 py-1 text-xs font-medium rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Thêm chi tiết phiếu
                  </button>
                  <button
                    type="button"
                    onClick={() => openEdit(requestForm)}
                    className="px-3 py-1 text-xs font-medium rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => openDelete(requestForm)}
                    className="px-3 py-1 text-xs font-medium rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </>
              )}
            />
          )}
        </div>
      </div>

      {/* Modal form */}
      <RequestFormModal
        open={open}
        mode={mode}
        formData={formData}
        formError={formError}
        submitting={submitting}
        selectedRequestForm={selectedRequestForm}
        companies={companies}
        onChange={handleChange}
        onSubmit={(e) => handleSubmit(e, pagination)}
        onClose={closeModal}
      />
    </div>
  );
}

export default RequestFormPage;
