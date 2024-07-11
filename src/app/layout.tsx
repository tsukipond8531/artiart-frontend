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
          <GoogleTagManager gtmId="GTM-TPTTH6Q7" />
          {/* Meta Pixel Code */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '734868487823383');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=734868487823383&ev=PageView&noscript=1"
            />
          </noscript>
          {/* End Meta Pixel Code */}
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
