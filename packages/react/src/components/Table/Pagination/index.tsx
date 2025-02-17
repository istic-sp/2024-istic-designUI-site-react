import React from 'react';

import { PaginationButton } from './PaginationButton';

interface PaginationProps {
  total: number;
  pageCurrent: number;
  onPaginate: (page: number) => void;
}

interface IPagination {
  pagination: PaginationProps;
}

const Pagination: React.FC<IPagination> = ({ pagination }) => {
  const { total, pageCurrent, onPaginate } = pagination;

  const handlePageChange = (page: number) => {
    if (page !== pageCurrent && page >= 1 && page <= total) {
      onPaginate(page);
    }
  };

  const pages = Array.from({ length: total }, (_, index) => index + 1);
  const isWithinRange = (
    pageNumber: number,
    start: number,
    end: number,
  ): boolean => pageNumber >= start && pageNumber <= end;

  const isFirstOrLastPage = (pageNumber: number, total: number): boolean =>
    pageNumber === 1 || pageNumber === total;

  const isWithinAdjacentRange = (
    pageNumber: number,
    currentPage: number,
    total: number,
  ): boolean =>
    currentPage === 1 || currentPage === total
      ? isWithinRange(pageNumber, currentPage - 3, currentPage + 3)
      : currentPage === 2 || currentPage === total - 1
        ? isWithinRange(pageNumber, currentPage - 2, currentPage + 2)
        : isWithinRange(pageNumber, currentPage - 1, currentPage + 1);

  const showingPages: number[] = pages.filter(
    (pageNumber: number) =>
      isFirstOrLastPage(pageNumber, total) ||
      pageNumber === pageCurrent ||
      isWithinAdjacentRange(pageNumber, pageCurrent, total),
  );

  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <PaginationButton
        iconName="arrow-left-s"
        disabled={pageCurrent === 1}
        onClick={() => handlePageChange(pageCurrent - 1)}
      />
      {showingPages.map((page, index) => {
        return (
          <React.Fragment key={index}>
            <PaginationButton
              key={String(index) + String(page)}
              active={page === pageCurrent}
              label={page.toString()}
              onClick={() => handlePageChange(page)}
            />
            {showingPages[index + 1] != undefined &&
              !(showingPages[index + 1] === page + 1) && (
                <div className="flex flex-row gap-[2px]">
                  {[0, 1, 2].map((key) => (
                    <div
                      key={key}
                      className="w-0.5 h-0.5 bg-neutral-600 rounded-full"
                    />
                  ))}
                </div>
              )}
          </React.Fragment>
        );
      })}
      <PaginationButton
        iconName="arrow-right-s"
        disabled={pageCurrent === total}
        onClick={() => handlePageChange(pageCurrent + 1)}
      />
    </div>
  );
};

Pagination.displayName = 'Pagination';
export { Pagination, PaginationProps };
