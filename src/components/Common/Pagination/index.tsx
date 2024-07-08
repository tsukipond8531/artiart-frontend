import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange }:any) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center mt-6 mb-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`mx-1 p-2 rounded-full ${currentPage === 1 ? 'text-gray-400' : 'text-gray-800 hover:text-black'}`}
      >
        <FaChevronLeft />
      </button>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-3 py-1 rounded-full ${currentPage === page ? 'bg-black text-white' : 'text-gray-800 hover:text-black'}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`mx-1 p-2 rounded-full ${currentPage === totalPages ? 'text-gray-400' : 'text-gray-800 hover:text-black'}`}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
