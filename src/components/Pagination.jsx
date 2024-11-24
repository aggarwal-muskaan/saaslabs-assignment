import React, { useEffect, useMemo, useState } from "react";
import classes from "./style.module.css";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage = 1,
  defaultPage = 1,
  onPageChange,
  siblingCount = 0,
  boundaryCount = 1,
}) => {
  const minDisplayResponse = useMemo(() => {
    return 2 * siblingCount + 2 * boundaryCount + 3;
  }, [siblingCount, boundaryCount]);

  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / itemsPerPage);
  }, [totalItems]);

  const [response, setResponse] = useState([]);

  useEffect(() => {
    if (totalPages) {
      if (totalPages <= minDisplayResponse) {
        const showBullets = new Array(totalPages)
          .fill("")
          .map((_, index) => ({ clickable: true, text: index + 1 }));
        setResponse(showBullets);
      } else {
        calculateBullets();
      }
    }
  }, [currentPage, totalItems]);

  const calculateBullets = () => {
    let showBullets = [];

    function leftSide() {
      let leftToCurrPage = [];

      if (currentPage - 1 <= siblingCount + boundaryCount + 1)
        leftToCurrPage = new Array(currentPage)
          .fill("")
          .map((_, index) => ({ clickable: true, text: index + 1 }));
      else {
        for (let i = 0; i < boundaryCount; i++)
          leftToCurrPage.push({ clickable: true, text: i + 1 });

        leftToCurrPage.push({ clickable: false, text: "..." });

        for (let i = siblingCount; i >= 0; i--)
          leftToCurrPage.push({ clickable: true, text: currentPage - i });
      }

      showBullets.push(...leftToCurrPage);
    }

    function rightSide() {
      let rightToCurrPage = [];

      if (totalPages - currentPage <= siblingCount + boundaryCount + 1)
        rightToCurrPage = new Array(totalPages - currentPage)
          .fill("")
          .map((_, index) => ({
            clickable: true,
            text: 1 + currentPage + index,
          }));
      else {
        for (let i = 0; i < siblingCount; i++)
          rightToCurrPage.push({ clickable: true, text: currentPage + i + 1 });

        rightToCurrPage.push({ clickable: false, text: "..." });

        for (let i = boundaryCount; i > 0; i--)
          rightToCurrPage.push({ clickable: true, text: totalPages - i + 1 });
      }

      showBullets.push(...rightToCurrPage);
    }

    // * order matters
    leftSide();
    if (currentPage !== totalPages) rightSide();
    setResponse(showBullets);
  };

  const handlePrevClick = () => {
    onPageChange((prev) => (prev - 1 > 0 ? prev - 1 : prev));
    // if (currentPage - 1 > 0) {
    //   onPageChange(currentPage - 1);
    // }
  };

  const handleBtnClick = (direction) => {
    direction === "prev" ? handlePrevClick() : handleNextClick();
  };

  const handleBulletClick = (pageNum) => {
    onPageChange(pageNum);
    // onPageChange(pageNum);
  };

  const handleNextClick = () => {
    onPageChange((prev) => (prev + 1 <= totalPages ? prev + 1 : prev));
    // if (currentPage + 1 <= totalPages) {
    //   onPageChange(currentPage + 1);
    // }
  };

  return (
    <div className={classes.pagination}>
      <button
        onClick={() => handleBtnClick("prev")}
        className={classes.prevBtn}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        &#60;
      </button>

      {response.map(({ text, clickable }, index) => {
        return (
          <button
            key={index}
            onClick={() => clickable && handleBulletClick(Number(text))}
            className={currentPage == text ? "active" : ""}
            aria-label={`Go to currentPage ${currentPage}`}
            style={{
              backgroundColor: currentPage == text ? "green" : "",
            }}
          >
            {text}
          </button>
        );
      })}

      <button
        onClick={() => handleBtnClick("next")}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
      >
        &#62;
      </button>
    </div>
  );
};

export default Pagination;
