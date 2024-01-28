import type { Metadata } from 'next';
import './globals.css';
import Image from 'next/image';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import SessionProvider from './SessionProvider';

export const metadata: Metadata = {
  title: 'Projekt Krank',
  description: "The sickest band's homepage",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black flex flex-col justify-between min-h-screen">
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
      </body>
    </html>
  );
}
