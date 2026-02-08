import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { deleteNote } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <Link href={`/notes/${note.id}`}>
            <h3>{note.title}</h3>
          </Link>
          <p>{note.content}</p>
          <div>
            <span>{note.tag} </span>

            <button onClick={() => mutation.mutate(note.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}