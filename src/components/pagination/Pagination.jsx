// Pagination.js
import React from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css'; // Import the styling

function Pagination({ pageCount, currentPage, handlePageClick }) {
  return (
    <ReactPaginate
      previousLabel={'previous'}
      nextLabel={'next'}
      breakLabel={'...'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
    />
  );
}

export default Pagination;
