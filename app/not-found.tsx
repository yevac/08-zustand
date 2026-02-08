import type { Metadata } from 'next';
import css from './Home.module.css'


export const metadata: Metadata = {
  title: '404 Page not found',
  description: 'Requested page does not exist',
  openGraph: {
    title: '404 Page not found',
    description: 'Requested page does not exist',
    url: '/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default function NotFound() {

  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};
