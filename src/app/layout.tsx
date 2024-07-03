import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Providers } from '../Providers';
import React, { Suspense } from 'react';
import Head from 'next/head';
import icon from '../../public/assets/images/favicon.ico';
import Link from 'next/link';
import { GoogleTagManager } from '@next/third-parties/google';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Artiart',
  description: 'Welcome to Artiart UAE',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <GoogleTagManager gtmId="GTM-TPTTH6Q7" />
        <body className={inter.className}>
          <Suspense>
            {children}
            <ToastContainer />
          </Suspense>
        </body>
      </html>
    </Providers>
  );
}
