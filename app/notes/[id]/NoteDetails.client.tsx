"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";

type Props = {
  id: string;
};

export default function NoteDetailsClient({ id }: Props) {
  const router = useRouter();
    const handleClose = () => router.back();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
            <button type="button" onClick={handleClose}>Back</button>
            <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            Create date: {new Date(note.createdAt).toLocaleDateString()}
          </p>
      </div>
    </div>
  );
}