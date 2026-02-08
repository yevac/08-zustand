"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import Link from 'next/link';

import { getNotes } from "@/lib/api";
import type { Note } from "@/types/note";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface NotesClientProps {
  searchQuery: string;
}

const PER_PAGE = 12;

export default function NotesClient({ searchQuery }: NotesClientProps) {
  const [search, setSearch] = useState(searchQuery);
  const [page, setPage] = useState(1);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", { page, perPage: PER_PAGE, search: debouncedSearch }],
    queryFn: () =>
      getNotes({
        page,
        perPage: PER_PAGE,
        search: debouncedSearch,
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError || !data) {
    return <p>Something went wrong.</p>;
  }

  console.log('SearchBox:', SearchBox);
  console.log('Pagination:', Pagination);
  console.log('NoteList:', NoteList);
  console.log('TanStackProvider', TanStackProvider);



  return (
    <div>
      <div>
        <SearchBox value={search} onSearch={handleSearchChange} />

{data.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={data.totalPages}
          onPageChange={handlePageChange}
        />
      )}

        <Link href="/notes/action/create" scroll={false}>
          Create note +
        </Link>

      </div>

      <NoteList notes={data.notes} />
    </div>
  );
}