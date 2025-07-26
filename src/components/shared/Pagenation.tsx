"use client";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import clsx from "clsx";

type PaginationProps = {
  Results?: { total: number };
  page: number;
  handlePageChange: (newPage: number) => void;
  limit?: number;
};

const Pagination = ({ Results, page, handlePageChange, limit = 6 }: PaginationProps) => {
  if (!Results || Results.total === 0) return null;

  const totalPages = Math.ceil(Results.total / limit);

  const maxPagesToShow = 5; // 보여줄 페이지 번호 개수
  const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  return (
    <div className="mt-16 flex items-center justify-center gap-3 tb:mt-6">
      {/* <button
        disabled={page === 1}
        onClick={() => handlePageChange(1)}
        className="flex h-7 w-7 items-center justify-center disabled:text-text-02"
      >
        <CaretDoubleLeft size={16} weight="bold" className="tb:w-[13px]" />
      </button> */}

      <button
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        className="flex h-7 w-7 items-center justify-center disabled:text-text-02"
      >
        <CaretLeftIcon size={16} weight="bold" className="tb:w-[13px]" />
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={clsx(
            "text-body flex h-8 w-8 items-center justify-center rounded-full font-pretendard font-medium",
            {
              "bg-secondary-default text-text-01": page === pageNumber,
              "bg-bg-01 text-text-04": page !== pageNumber
            }
          )}
        >
          {pageNumber}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
        className="flex h-7 w-7 items-center justify-center disabled:text-text-02"
      >
        <CaretRightIcon size={16} weight="bold" className="tb:w-[13px]" />
      </button>

      {/* <button
        disabled={page === totalPages}
        onClick={() => handlePageChange(totalPages)}
        className="flex h-7 w-7 items-center justify-center disabled:text-text-02"
      >
        <CaretDoubleRight size={16} weight="bold" className="tb:w-[13px]" />
      </button> */}
    </div>
  );
};

export default Pagination;
