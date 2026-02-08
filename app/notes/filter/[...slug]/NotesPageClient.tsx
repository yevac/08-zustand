"use client";

import css from "@/app/notes/filter/[...slug]/NotesPage.module.css";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getNotes } from "@/lib/api";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import type { NoteTag } from "@/types/note";

interface NotesPageClientProps {
  tag?: NoteTag;
}

const PER_PAGE = 12;

export default function NotesPageClient({ tag }: NotesPageClientProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "notes",
      { page, perPage: PER_PAGE, tag, search: debouncedSearch },
    ],
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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isError || !data) return <p>{isError}</p>;

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

        <button type="button" className={css.button} onClick={openModal}>
          Add note +
        </button>
      </div>
      

      {data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found.</p>
      )}
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <NoteForm
            closeModal={closeModal}
            onCreated={() => {
              setPage(1);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

