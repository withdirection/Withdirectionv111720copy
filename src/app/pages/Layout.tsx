import { Outlet, ScrollRestoration } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useDocumentTitle } from '../useDocumentTitle';

export function Layout() {
  useDocumentTitle();

  return (
    <div className="min-h-screen bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-white focus:text-[#14213D] focus:px-4 focus:py-3 focus:rounded-md focus:ring-2 focus:ring-[#00A9E0]"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
