import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create note",
  description: "Page for creating new note",
  openGraph: {
    title: "Create note",
    description: "Page for creating new note",
    url: "/notes/action/create",
    images: [{ url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" }],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
