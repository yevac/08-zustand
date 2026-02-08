import { NoteTag } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Draft = {
  title: string;
  content: string;
  tag: NoteTag;
};

export const initialDraft: Draft = {
  title: "",
  content: "",
  tag: "Todo",
};

interface NoteStore {
  draft: typeof initialDraft;
  setDraft: (note: Partial<typeof initialDraft>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),

      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
    }
  )
);