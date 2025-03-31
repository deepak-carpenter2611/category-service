"use client";
import { useRef, useState } from "react";

export default function CustomTable({
  columns,
  data,
  itemsPerPageOptions = [10, 15],
  hideSearch,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const [expandedRows, setExpandedRows] = useState({});
  const [columnWidths, setColumnWidths] = useState(columns.map(() => 250));
  const tableRef = useRef(null);

  const handleSort = (columnKey) => {
    const newSortOrder =
      sortColumn === columnKey && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(columnKey);
    setSortOrder(newSortOrder);
  };

  const filteredData = data[0]
    ? data.filter((row) =>
        columns.some((col) =>
          row[col.key]
            ?.toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      ) || []
    : [];

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    const valA = a[sortColumn]?.toString().toLowerCase();
    const valB = b[sortColumn]?.toString().toLowerCase();
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleMouseDown = (index, event) => {
    const startX = event.clientX;
    const startWidth = columnWidths[index];

    const handleMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      if (newWidth > 50) {
        // Minimum width
        setColumnWidths((prevWidths) =>
          prevWidths.map((w, i) => (i === index ? newWidth : w))
        );
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleReadMore = (rowId, field) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [rowId]: {
        ...prevState[rowId],
        [field]: !prevState[rowId]?.[field],
      },
    }));
  };

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-lg">
      <table
        ref={tableRef}
        className="w-100 border border-gray-300 border-collapse"
        style={{ tableLayout: "fixed" }}
      >
        <thead className="bg-white border-b">
          {/* Main Header Row */}
          <tr className="border border-collapse border-bottom-1 text-uppercase">
            {columns.map((col, index) => (
              <th
                key={col.key}
                className="px-4 py-2 text-left cursor-pointer align-top table-font position-relative border border-gray-300"
                style={{
                  backgroundColor: col?.bgColor,
                  width: col.subColumns ? 450 : columnWidths[index],
                  color: col?.textColor,
                  textAlign: col?.textAlign,
                }}
                colSpan={col.subColumns ? col.subColumns.length : 1}
                rowSpan={col.subColumns ? 1 : 2} // Ensure non-subcolumn headers span both rows
                onClick={
                  !col.subColumns ? () => handleSort(col.key) : undefined
                }
              >
                {col.label}{" "}
                {!col.subColumns &&
                  (sortColumn === col.key ? (
                    sortOrder === "asc" ? (
                      "🔼"
                    ) : (
                      "🔽"
                    )
                  ) : (
                    <i className="bi bi-arrows-vertical" />
                  ))}{" "}
                <div
                  className="resizer"
                  onMouseDown={(e) => handleMouseDown(index, e)}
                ></div>
              </th>
            ))}
          </tr>

          {/* SubColumns Row */}
          {columns.some((col) => col.subColumns) && (
            <tr className="border border-collapse border-bottom-1 text-uppercase">
              {columns.flatMap(
                (col) =>
                  col.subColumns
                    ? col.subColumns.map((subCol) => (
                        <th
                          key={`${col.key}-${subCol.key}`}
                          className="px-4 py-2 text-left cursor-pointer align-top table-font"
                          onClick={() => handleSort(subCol.key)}
                          style={{
                            backgroundColor: subCol?.bgColor,
                            color: subCol?.textColor,
                          }}
                        >
                          {subCol.label}{" "}
                          {sortColumn === subCol.key ? (
                            sortOrder === "asc" ? (
                              "🔼"
                            ) : (
                              "🔽"
                            )
                          ) : (
                            <i className="bi bi-arrows-vertical" />
                          )}
                        </th>
                      ))
                    : [] // No subcolumns, skip adding anything
              )}
            </tr>
          )}
        </thead>

        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row) => (
              <tr
                key={row.id}
                className="border-b table-content-font border-bottom"
              >
                {columns.flatMap((col, index) =>
                  col.subColumns
                    ? col.subColumns.map((subCol) => (
                        <td
                          key={subCol.key}
                          className="px-4 py-2 table-content-font border border-gray-300"
                          style={{
                            alignItems: "flex-start",
                            width: col.subColumns ? 450 : columnWidths[index],
                          }}
                        >
                          {row[subCol.key] || 0}
                        </td>
                      ))
                    : [
                        <td
                          key={col.key}
                          className="px-4 py-2 table-content-font align-top border border-gray-300"
                          style={{
                            verticalAlign: "baseline",
                            minWidth:
                              col.key === "actions"
                                ? columnWidths[index]
                                : col.truncate
                                ? "350px"
                                : "200px",
                            width: columnWidths[index], // Ensure it applies dynamically
                          }}
                        >
                          {col.truncate ? (
                            <>
                              <span
                                className="tooltip-container"
                                data-tooltip={row[col.key]}
                              >
                                {expandedRows[row.id]?.[col.key] ||
                                row[col.key]?.split(" ").length <= 10
                                  ? row[col.key]
                                  : row[col.key]
                                      ?.split(" ")
                                      .slice(0, 5)
                                      .join(" ") + "... "}
                              </span>

                              {row[col.key]?.split(" ").length > 5 && (
                                <button
                                  className="text-blue-500 ml-2 btn"
                                  onClick={() =>
                                    toggleReadMore(row.id, col.key)
                                  }
                                >
                                  {expandedRows[row.id]?.[col.key]
                                    ? "...Read Less"
                                    : "...Read More"}
                                </button>
                              )}
                            </>
                          ) : col.render ? (
                            col.render(row)
                          ) : (
                            row[col.key] || "-"
                          )}
                        </td>,
                      ]
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          className="px-1 py-1 rounded m-2 btn border-0"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>{`Page ${currentPage} of ${totalPages || 1}`}</span>
        <button
          className="px-1 py-1 rounded m-2 btn"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
