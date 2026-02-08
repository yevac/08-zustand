'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import css from './NoteForm.module.css';
import { createNote } from '@/lib/api';
import type { NoteTag } from '@/types/note'; 

type NoteFormProps = {
  closeModal?: () => void;
  onCreated?: () => void;
};

type Draft = {
  title: string;
  content: string;
  tag: NoteTag;
};

export default function NoteForm({ closeModal, onCreated }: NoteFormProps) {
  const router = useRouter();

  const [draft, setDraft] = useState<Draft>({
    title: '',
    content: '',
    tag: 'Todo', 
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createNote(draft);

    setDraft({ title: '', content: '', tag: draft.tag });

    onCreated?.();

    closeModal?.();

    router.back();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        value={draft.title}
        onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        placeholder="Title"
        required
      />

      <textarea
        className={css.textarea}
        value={draft.content}
        onChange={(e) => setDraft({ ...draft, content: e.target.value })}
        placeholder="Content"
        required
      />

      <select
        className={css.select}
        value={draft.tag}
        onChange={(e) => setDraft({ ...draft, tag: e.target.value as NoteTag })}
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>

      <button className={css.button} type="submit">
        Create
      </button>
    </form>
  );
}