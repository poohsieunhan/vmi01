import MyDataTable from "../components/common/MyDataTable";
import RequestFormDetailModal from "../components/requestformdetail/RequestFormDetailModal"
import MySearchInput from "../components/common/MySearchInput";
import { useRequestFormDetail } from "../hooks/requestformdetail/useRequestFormDetail"
import { useRequestFormDetailForm } from "../hooks/requestformdetail/useRequestFormDetailForm"
import { requestFormDetailColumns } from "../components/requestformdetail/requestFormDetailColumns";
import { useState, useEffect } from "react";
//import companyApi from "../services/companyApi";
import requestFormApi from "../services/requestFormApi";
import requestFormDetailApi from "../services/requestFormDetailApi";
import { useParams } from "react-router-dom";



function RequestFormDetailPage() {
  const { id } = useParams(); // chính là requestForm.Id
  const [requestForm, setRequestForm] = useState(null);
  const [details, setDetails] = useState([]);

const fetchRequestFormById = async (id) => {
  try {
    const result = await requestFormApi.getById(id);
    setRequestForm(result.data);
  } catch (err) {
    console.error("Failed to load request form", err);
  }
};

const fetchRequestFormDetails = async (id) => {
    try {
      const result = await requestFormDetailApi.getAllByRequestFormId(id);
      setDetails(result.data);
    } catch (err) {
      console.error("Failed to load request form details", err);
    }
       
}

  useEffect(() => {
    // gọi API lấy header phiếu
    fetchRequestFormById(id);

    // gọi API lấy danh sách chi tiết
    fetchRequestFormDetails(id);
  }, [id]);

  return (
    <div className="p-6 space-y-6">
      {/* HEADER PHIẾU */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold text-lg">
          Chi tiết phiếu: {requestForm?.SoPhieu}
        </h2>
      </div>

      {/* FORM NHẬP CHI TIẾT */}
      <div className="bg-white rounded shadow p-4">
        {/* Form nhập ThietBi, SoLuong, isHC, isKD, isDTN, isKhac, Lab, GhiChu */}
      </div>

      {/* GRID CHI TIẾT */}
      <div className="bg-white rounded shadow p-4">
        <MyDataTable
          columns={requestFormDetailColumns}
          data={details}
        />
      </div>

      {/* NÚT SAVE CUỐI CÙNG */}
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">
          Lưu chi tiết phiếu
        </button>
      </div>
    </div>
  );

}

export default RequestFormDetailPage;