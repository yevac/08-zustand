"use client";

import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);

  const mutation = useMutation({
  mutationFn: createNote,
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ["notes"] });
    clearDraft();
    router.back();
  },
});
  
  async function handleSubmit() {
  mutation.mutate({
    title: draft.title.trim(),
    content: draft.content.trim(),
    tag: draft.tag,
  });
}

  return (
    <form action={handleSubmit} className={css.form}>
      <label className={css.label}>
        Title
        <input
          name="title" required
          type="text"
          value={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
          className={css.input}
        />
      </label>

      <label className={css.label}>
        Content
        <textarea
          name="content" required
          rows={5}
          value={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
          className={css.textarea}
        />
      </label>

      <label className={css.label}>
        Tag
        <select
          name="tag"
          value={draft.tag}
          onChange={(e) => setDraft({ tag: e.target.value as NoteTag })}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>

      <div className={css.actions}>
        <button type="submit">Create note</button>

        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
}