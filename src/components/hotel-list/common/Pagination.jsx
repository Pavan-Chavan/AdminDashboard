import { useState } from "react";

const Pagination = ({setSearchParams,totalPages}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSearchParams((prev) => ({ ...prev, page:pageNumber }));
  };

  const renderPage = (pageNumber, isActive = false) => {
    const className = `size-40 flex-center rounded-full cursor-pointer ${
      isActive ? "bg-dark-1 text-white" : ""
    }`;
    return (
      <div key={pageNumber} className="col-auto">
        <div className={className} onClick={() => handlePageClick(pageNumber)}>
          {pageNumber}
        </div>
      </div>
    );
  };
  
  const renderPages = () => {
    const pageNumbers = [];
    const maxPagesToShow = 7; // Maximum number of page buttons to show at once
  
    // If there are many pages, display a subset
    if (totalPages <= maxPagesToShow) {
      // If total pages are fewer than the max, just show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show first few pages, the current page, and last few pages
      pageNumbers.push(1); // Always show the first page
      if (currentPage > 4) pageNumbers.push('...'); // Show ellipses if we're not near the start
      for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
        pageNumbers.push(i);
      }
      if (currentPage < totalPages - 3) pageNumbers.push('...'); // Show ellipses if we're not near the end
      pageNumbers.push(totalPages); // Always show the last page
    }
  
    return pageNumbers.map((page, index) => {
      if (page === '...') {
        return (
          <div key={index} className="col-auto">
            <div className="size-40 flex-center rounded-full cursor-pointer">...</div>
          </div>
        );
      } else {
        return renderPage(page, page === currentPage);
      }
    });
  };
  

  const decreasePage = () => {
    if (totalPages === 1) {
    }
    else if (currentPage === 1) {
      setCurrentPage(totalPages);
      setSearchParams((prev) => ({ ...prev, page: totalPages}));
    } else {
      setCurrentPage(currentPage-1);
      setSearchParams((prev) => ({ ...prev, page:currentPage-1 }));
    }
  }

  const increasePage = () =>{
    if (totalPages === 1) {
    }
    if (currentPage === totalPages) {
      setCurrentPage(1);
      setSearchParams((prev) => ({ ...prev, page:1 }));
    } else {
      setCurrentPage(currentPage+1);
      setSearchParams((prev) => ({ ...prev, page:currentPage+1 }));
    }
  }
  return (
    <div className="border-top-light mt-30 pt-30">
      <div className="row x-gap-10 y-gap-20 justify-between md:justify-center">
        <div className="col-auto md:order-1">
          <button className="button -blue-1 size-40 rounded-full border-light" onClick={decreasePage}>
            <i className="icon-chevron-left text-12" />
          </button>
        </div>

        <div className="col-md-auto md:order-3">
          <div className="row x-gap-20 y-gap-20 items-center md:d-none">
            {renderPages()}
          </div>

          <div className="row x-gap-10 y-gap-20 justify-center items-center d-none md:d-flex">
            {renderPages()}
          </div>

          {/* <div className="text-center mt-30 md:mt-10">
            <div className="text-14 text-light-1">
              1 – 20 of 300+ properties found
            </div>
          </div> */}
        </div>

        <div className="col-auto md:order-2">
          <button className="button -blue-1 size-40 rounded-full border-light" onClick={increasePage}>
            <i className="icon-chevron-right text-12" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
