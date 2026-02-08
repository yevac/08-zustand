import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";

import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";

const OG_IMAGE = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://08-zustand-eight-smoky.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;

  try {
    const note = await fetchNoteById(id);

    const title = note.title;
    const description =
      (note.content ?? "").slice(0, 140) || `Details for note "${title}"`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/notes/${id}`,
        images: [OG_IMAGE],
      },
    };
  } catch {
    notFound();
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}
