import type { Metadata } from "next";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Roboto } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://08-zustand-eight-smoky.vercel.app";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "A simple notes application built with Next.js",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "NoteHub",
    description: "NoteHub – convenient app for managing your notes",
    url: SITE_URL,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className={roboto.className}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
