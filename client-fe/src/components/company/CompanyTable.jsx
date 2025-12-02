function CompanyTable({
  companies,
  pagination,
  onEdit,
  onDelete,
  onChangePage,
}) {
  return (
    <div className="mt-6 overflow-x-auto">
      <div className="bg-debugColor text-white p-2">Test debug color</div>
      <div className="inline-block min-w-full align-middle rounded-lg overflow-hidden shadow-sm">
        <table className="min-w-full text-sm text-slate-700 border border-slate-200 border-collapse bg-white">
          {/* HEADER */}
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 border border-slate-200 text-left text-xs font-semibold text-slate-500">
                ID
              </th>
              <th className="px-4 py-2 border border-slate-200 text-left text-xs font-semibold text-slate-500">
                TÊN CÔNG TY
              </th>
              <th className="px-4 py-2 border border-slate-200 text-left text-xs font-semibold text-slate-500">
                ĐỊA CHỈ
              </th>
              <th className="px-4 py-2 border border-slate-200 text-left text-xs font-semibold text-slate-500 whitespace-nowrap">
                MÃ SỐ THUẾ
              </th>
              <th className="px-4 py-2 border border-slate-200 text-left text-xs font-semibold text-slate-500">
                EMAIL
              </th>
              <th className="px-4 py-2 border border-slate-200 text-left text-xs font-semibold text-slate-500 whitespace-nowrap">
                TEL
              </th>
              <th className="px-4 py-2 border border-slate-200 text-left text-xs font-semibold text-slate-500 whitespace-nowrap">
                FAX
              </th>
              <th className="px-4 py-2 border border-slate-200 text-right text-xs font-semibold text-slate-500 whitespace-nowrap">
                THAO TÁC
              </th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {companies.map((c) => (
              <tr
                key={c.Id}
                className="odd:bg-white even:bg-slate-250 hover:bg-slate-100 transition-colors"
              >
                <td className="px-4 py-2 border border-slate-200 align-top whitespace-nowrap bg-transparent">
                  {c.Id}
                </td>

                <td className="px-4 py-2 border border-slate-200 align-top bg-transparent">
                  {c.TenCongTy}
                </td>

                <td className="px-4 py-2 border border-slate-200 align-top whitespace-normal break-words bg-transparent">
                  {c.DiaChi}
                </td>

                <td className="px-4 py-2 border border-slate-200 align-top whitespace-nowrap bg-transparent">
                  {c.MaSoThue || "-"}
                </td>

                <td className="px-4 py-2 border border-slate-200 align-top break-all bg-transparent">
                  {c.Email || "-"}
                </td>

                <td className="px-4 py-2 border border-slate-200 align-top whitespace-nowrap bg-transparent">
                  {c.Tel || "-"}
                </td>

                <td className="px-4 py-2 border border-slate-200 align-top whitespace-nowrap bg-transparent">
                  {c.Fax || "-"}
                </td>

                <td className="px-4 py-2 border border-slate-200 align-top">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(c)}
                      className="px-3 py-1 text-xs font-medium rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(c)}
                      className="px-3 py-1 text-xs font-medium rounded bg-red-500 text-white hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {companies.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-6 border border-slate-200 text-center text-slate-500"
                >
                  Không có dữ liệu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {pagination && (
        <div className="mt-4 flex items-center justify-end gap-3 text-sm text-slate-700">
          <button
            type="button"
            disabled={pagination.page <= 1}
            onClick={() => onChangePage(pagination.page - 1)}
            className="px-3 py-1.5 rounded border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trang trước
          </button>

          <span>
            Trang {pagination.page} / {pagination.totalPages}
          </span>

          <button
            type="button"
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => onChangePage(pagination.page + 1)}
            className="px-3 py-1.5 rounded border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trang sau
          </button>
        </div>
      )}
    </div>
  );
}

export default CompanyTable;
