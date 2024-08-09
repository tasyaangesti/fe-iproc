import React from "react";
import { Paginator } from "primereact/paginator";

export default function Pagination({
  currentPage,
  onPageChange,
  totalRecords,
}) {
  const onPageChangeHandler = (event) => {
    onPageChange(event.page + 1);
  };

  return (
    <div className="card mt-4">
      <Paginator
        first={(currentPage - 1) * 10}
        rows={10}
        totalRecords={totalRecords}
        rowsPerPageOptions={[10, 20, 30]}
        onPageChange={onPageChangeHandler}
      />
    </div>
  );
}
