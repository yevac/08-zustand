"use client";

import css from "@/app/notes/filter/[...slug]/NotesPage.module.css";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getNotes } from "@/lib/api";
import Link from "next/link";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import type { NoteTag } from "@/types/note";

interface NotesPageClientProps {
  tag?: NoteTag;
}

const PER_PAGE = 12;

export default function NotesPageClient({ tag }: NotesPageClientProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", { page, perPage: PER_PAGE, tag, search: debouncedSearch }],
    queryFn: () =>
      getNotes({
        page,
        perPage: PER_PAGE,
        tag,
        search: debouncedSearch,
      }),
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  if (isError) return <p>{(error as Error)?.message ?? "Something went wrong"}</p>;
  if (!data) return null;

  return (
    <div className={css.app}>
      {isLoading && <p>Loading...</p>}

      <div className={css.toolbar}>
        <SearchBox value={search} onSearch={handleSearchChange} />

        {data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Add note +
        </Link>
      </div>

      {data.notes.length > 0 ? <NoteList notes={data.notes} /> : <p>No notes found.</p>}
    </div>
  );
}
