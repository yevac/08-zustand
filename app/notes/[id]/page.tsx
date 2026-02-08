import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";

import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";

const OG_IMAGE = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const note = await fetchNoteById(params.id);

    const title = note.title || "Note";
    const description =
      note.content?.slice(0, 140) || "Note details in NoteHub.";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://notehub-public.goit.study/notes/${params.id}`,
        images: [OG_IMAGE],
      },
    };
  } catch {
    notFound();
  }
}

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
