import { useEffect, useMemo, useState } from "react";

interface UsePaginationProps<T> {
  items: T[];
  limit: number;
}

/**
 * Custom hook to handle pagination logic
 * @param items - Array of items to paginate
 * @param limit - Number of items per page
 * @returns Current page, current items, and page change handler
 */
export const usePagination = <T>({ items, limit }: UsePaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  // limit 변경 시 페이지 재조정
  useEffect(() => {
    const maxPage = Math.ceil(items.length / limit);
    if (currentPage > maxPage && maxPage > 0) {
      setCurrentPage(maxPage);
    }
  }, [limit, items.length, currentPage]);

  // 현재 페이지에 해당하는 아이템들
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, limit]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return {
    currentPage,
    currentItems,
    handlePageChange
  };
};
