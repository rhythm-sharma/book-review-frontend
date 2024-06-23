"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useCallback, useMemo } from "react";

export default function PaginationSection({
  currentPage,
  onPageChange,
  totalPages,
}: any) {
  const isNextDisabled = useMemo(
    () => currentPage === totalPages - 1,
    [currentPage, totalPages]
  );

  const isPrevDisabled = useMemo(() => currentPage === 0, [currentPage]);

  const handleOnPrevPage = useCallback(() => {
    if (isPrevDisabled) {
      return;
    }
    onPageChange(currentPage - 1);
  }, [onPageChange, currentPage, isPrevDisabled]);

  const handleOnNextPage = useCallback(() => {
    if (isNextDisabled) {
      return;
    }
    onPageChange(currentPage + 1);
  }, [onPageChange, currentPage, isNextDisabled]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={handleOnPrevPage} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{currentPage + 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" onClick={handleOnNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
