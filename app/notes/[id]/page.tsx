import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient, } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

type NoteDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type Props = {
  params: {
    slug: string[];
  };
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

export default async function NoteDetailsPage({ params }: NoteDetailsPageProps) {
  const { id } = await params;

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
