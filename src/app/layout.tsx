import type { Metadata } from 'next';
import './globals.css';
import Image from 'next/image';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import SessionProvider from './SessionProvider';
import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: 'Projekt Krank',
  description: "The sickest band's homepage",
};

const kodemono = localFont({ src: '../../public/fonts/kodemono.ttf' });
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
      </body>
    </html>
  );
}
