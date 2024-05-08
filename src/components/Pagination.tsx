import React from "react";
import "../Pagination.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Determine the range of pages to display
  const maxPagesToShow = 5;
  let startPage = currentPage - Math.floor(maxPagesToShow / 2);
  let endPage = currentPage + Math.floor(maxPagesToShow / 2);

  // Adjust start and end page if they go out of bounds
  if (startPage < 1) {
    startPage = 1;
    endPage = maxPagesToShow;
  }
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = totalPages - maxPagesToShow + 1;
    if (startPage < 1) {
      startPage = 1;
    }
  }

  // Create an array of page numbers to display
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>Previous</button>
      )}
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={currentPage === pageNumber ? "active" : ""}
        >
          {pageNumber}
        </button>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
      )}
    </div>
  );
};

export default Pagination;
