import type { Metadata } from 'next';
import TAGS from "@/constants/noteTags";
import { notFound } from "next/navigation";
import NotesPageClient from "./NotesPageClient";
import type { NoteTag } from "@/types/note";

type Props = {
  params: {
    slug: string[];
  };
};

 export default function NotesByCategory({ params }: Props) {
  const { slug } = params;
  const filter = slug?.[0];

  function isNoteTag(value: string): value is NoteTag {
    return TAGS.includes(value as NoteTag);
  }

  if (filter === "all") {
    return <NotesPageClient />;
  }

  if (isNoteTag(filter)) {
    return <NotesPageClient tag={filter} />;
  }

  notFound();
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = params.slug?.[0] ?? 'all';

  return {
    title: `Notes filter: ${tag}`,
    description: `Viewing notes filtered by ${tag}`,
    openGraph: {
      title: `Notes filter: ${tag}`,
      description: `Viewing notes filtered by ${tag}`,
      url: `/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        },
      ],
    },
  };
}