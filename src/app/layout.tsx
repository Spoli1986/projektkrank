import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import SessionProvider from './SessionProvider';
import { Roboto } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'Projekt Krank',
  description: "The sickest band's homepage",
};

const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] });
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`flex flex-col bg-aufbruch bg-cover justify-between min-h-screen ${roboto.className}`}>
        <SessionProvider>
          <Navbar />
          {/* <Image
					src={baby}
					fill
					alt="baby"
					style={{
						objectFit: "contain",
						zIndex: -1,

						backgroundColor: "rgb(31 41 55)",
					}}
				/> */}

          {children}
          <Footer />
        </SessionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
