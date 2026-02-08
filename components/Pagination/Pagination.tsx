"use client";

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css"

interface PaginationProps {
  totalPages: number;
  page: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  page,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={page - 1}
      onPageChange={(selected) =>
        onPageChange(selected.selected + 1)}
      previousLabel="Previous"
      nextLabel="Next"
      breakLabel="..."

      containerClassName={css.pagination}
      pageClassName={css.pageItem}
      activeClassName={css.active}
      previousClassName={css.pageItem}
      nextClassName={css.pageItem}
    />
  );
}