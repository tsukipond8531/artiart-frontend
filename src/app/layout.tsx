import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Providers } from '../Providers';
import React, { Suspense } from 'react';
import Head from 'next/head';

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
        <head>

          <noscript>
            <div dangerouslySetInnerHTML={{
              __html: `&lt;img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=734868487823383&amp;ev=PageView&amp;noscript=1"
            /&gt;` }} />
          </noscript>


        </head>
        <body className={inter.className}>
          <GoogleTagManager gtmId="GTM-TPTTH6Q7" />
          <Suspense>
            {children}
            <ToastContainer />
          </Suspense>
        </body>
      </html>
    </Providers>
  );
}
