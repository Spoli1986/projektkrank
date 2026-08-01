import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import SessionProvider from './SessionProvider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: {
    default: 'Projekt Krank',
    template: '%s | Projekt Krank',
  },
  description: 'Projekt Krank – Mundart, Metal, Industrial und elektronische Samples aus der Schweiz.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-theme="projektkrank" data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        <SessionProvider>
          <Navbar />
          <div className="flex min-h-screen flex-1 flex-col">{children}</div>
          <Footer />
        </SessionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
