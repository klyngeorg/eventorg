'use client';
import { Outfit } from 'next/font/google';
import { trpc } from '../utils/trpc';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--outfit-font',
});

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  );
}

export default trpc.withTRPC(RootLayout);
