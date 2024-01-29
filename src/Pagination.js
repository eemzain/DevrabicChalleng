import React from 'react';

const Pagination = ({ pageCount, currentPage, onPageChange }) => {
  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="pagination" style={{marginBottom:"10pt" , marginTop:"10pt"}}>
      {Array.from({ length: pageCount }, (_, index) => (
        <div
          key={index}
          className={`${
            currentPage === index ? 'active' : ''
          }`}
          onClick={() => handlePageClick(index)}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default Pagination;