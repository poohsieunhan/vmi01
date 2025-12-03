// DataTable generic: dùng được cho nhiều entity

/* eslint-disable react/prop-types */

function MyDataTable({
  columns = [],
  data = [],
  renderActions, // (row) => JSX
  pagination,
  onChangePage,
  emptyText = "Không có dữ liệu.",
  actionsHeader = "THAO TÁC",
}) {
  const hasActions = typeof renderActions === "function";
  return (
    <div className="mt-6 overflow-x-auto">
      <div className="inline-block min-w-full align-middle rounded-lg overflow-hidden shadow-sm ">
        <table className="min-w-full text-sm text-slate-700 border border-slate-200 border-collapse bg-white ">
          {/* HEADER */}
          <thead className="bg-slate-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={
                    "px-4 py-2 border border-slate-200 text-center text-xs font-semibold text-slate-500 " +
                    (col.thClassName || "")
                  }
                >
                  {col.header}
                </th>
              ))}

              {hasActions && (
                <th className="px-4 py-2 border border-slate-200 text-center text-xs font-semibold text-slate-500 whitespace-nowrap">
                  {actionsHeader}
                </th>
              )}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="px-4 py-6 border border-slate-200 text-center text-slate-500"
                >
                  {emptyText}
                </td>
              </tr>
            )}

            {data.map((row, index) => (
              <tr
                key={row.Id ?? row.id ?? index}
                className="odd:bg-white even:bg-slate-100 hover:bg-slate-300 transition-colors"
              >
                {columns.map((col) => {
                  const value =
                    typeof col.accessor === "function"
                      ? col.accessor(row)
                      : col.accessor
                      ? row[col.accessor]
                      : row[col.id];

                  return (
                    <td
                      key={col.id}
                      className={
                        "px-4 py-2 border border-slate-200 align-top bg-transparent " +
                        (col.tdClassName || "")
                      }
                    >
                      {col.cell ? col.cell(row, value) : value ?? "-"}
                    </td>
                  );
                })}

                {hasActions && (
                  <td className="px-4 py-2 border border-slate-200 align-top">
                    <div className="flex justify-end gap-2">
                      {renderActions(row)}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {pagination && (
        <div className="mt-4 flex items-center justify-end gap-3 text-sm text-slate-700">
          <button
            type="button"
            disabled={pagination.page <= 1}
            //onClick={() => onChangePage(pagination.page - 1)}
            onClick={() => {
              const newPage = pagination.page - 1;
              console.log("MyDataTable: click Prev ->", newPage);
              onChangePage && onChangePage(newPage);
            }}
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
            //onClick={() => onChangePage(pagination.page + 1)}
            onClick={() => {
              const newPage = pagination.page + 1;
              console.log("MyDataTable: click Next ->", newPage);
              onChangePage && onChangePage(newPage);
            }}
            className="px-3 py-1.5 rounded border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trang sau
          </button>
        </div>
      )}
    </div>
  );
}

export default MyDataTable;
