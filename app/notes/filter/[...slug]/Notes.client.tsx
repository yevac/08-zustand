"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import Link from "next/link";

import { getNotes } from "@/lib/api";
import type { Note, NoteTag } from "@/types/note";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface NotesClientProps {
  tag?: NoteTag;
}

const PER_PAGE = 12;

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError, error } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", { page, perPage: PER_PAGE, search: debouncedSearch, tag }],
    queryFn: () =>
      getNotes({
        page,
        perPage: PER_PAGE,
        search: debouncedSearch,
        tag,
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !data) return <p>{(error as Error)?.message ?? "Something went wrong."}</p>;

  return (
    <div>
      <div>
        <SearchBox value={search} onSearch={handleSearchChange} />

        {data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}

        <Link href="/notes/action/create" scroll={false}>
          Create note +
        </Link>
      </div>

      {data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found.</p>
      )}
    </div>
  );
}
