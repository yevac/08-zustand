import type { Metadata } from "next";
import TAGS from "@/constants/noteTags";
import { notFound } from "next/navigation";
import type { NoteTag } from "@/types/note";

import NotesPageClient from "./NotesPageClient";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getNotes } from "@/lib/api";

interface NotesByCategoryParams {
  slug?: string[];
}

function isNoteTag(value: string): value is NoteTag {
  return TAGS.includes(value as NoteTag);
}

const PER_PAGE = 12;
const OG_IMAGE = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

function resolveTag(slug?: string[]) {
  const filter = slug?.[0] ?? "all";

  if (filter === "all") return { filter, tag: undefined as NoteTag | undefined };
  if (isNoteTag(filter)) return { filter, tag: filter };
  notFound();
}

export async function generateMetadata({
  params,
}: {
  params: NotesByCategoryParams;
}): Promise<Metadata> {
  const { filter } = resolveTag(params.slug);

  const title = filter === "all" ? "All notes" : `Notes: ${filter}`;
  const description =
    filter === "all"
      ? "Browse all notes in NoteHub."
      : `Browse notes filtered by "${filter}" tag in NoteHub.`;

  const url =
    filter === "all"
      ? "https://notehub-public.goit.study/notes/filter/all"
      : `https://notehub-public.goit.study/notes/filter/${encodeURIComponent(filter)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [OG_IMAGE],
    },
  };
}

export default async function Page({
  params,
}: {
  params: NotesByCategoryParams;
}) {
  const { tag } = resolveTag(params.slug);

  const queryClient = new QueryClient();
  const queryParams = { page: 1, perPage: PER_PAGE, search: "", tag };

  await queryClient.prefetchQuery({
    queryKey: ["notes", queryParams],
    queryFn: () => getNotes(queryParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPageClient tag={tag} />
    </HydrationBoundary>
  );
}
