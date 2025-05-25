'use client';

import { useState } from 'react';

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function Pagination({ 
  currentPage = 1, 
  totalPages = 10,
  onPageChange = () => {}
}: PaginationProps) {
  const [activePage, setActivePage] = useState(currentPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setActivePage(page);
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    handlePageChange(activePage - 1);
  };

  const handleNext = () => {
    handlePageChange(activePage + 1);
  };

  return (
    <nav className="mt-6 py-2 flex justify-center" aria-label="Pagination">
      <ul className="flex items-center space-x-1">
        <li>
          <button 
            onClick={handlePrevious}
            disabled={activePage <= 1}
            className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            前へ
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page}>
            <button
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1.5 text-sm font-medium ${
                page === activePage 
                  ? 'bg-sky-600 text-white hover:bg-sky-700' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              } rounded-md transition-colors`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button 
            onClick={handleNext}
            disabled={activePage >= totalPages}
            className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            次へ
          </button>
        </li>
      </ul>
    </nav>
  );
}