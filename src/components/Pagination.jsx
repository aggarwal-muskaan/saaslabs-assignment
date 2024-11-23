import React from "react";
import classes from "./style.module.css";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={classes.pagination}>
      <button
        onClick={handlePrevClick}
        className={classes.prevBtn}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => handlePageClick(number)}
          className={currentPage === number ? "active" : ""}
        >
          {number}
        </button>
      ))}
      <button onClick={handleNextClick} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
