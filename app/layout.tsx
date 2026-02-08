import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Roboto } from 'next/font/google';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "./globals.css";

console.log("Header:", Header);


const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata = {
  title: "NoteHub",
  description: "A simple notes application built with Next.js",
  openGraph: {
    title: 'NoteHub',
    description: 'NoteHub – convenient app for managing your notes',
    url: 'https://your-vercel-url.vercel.app',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
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
    <html lang="en">
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
