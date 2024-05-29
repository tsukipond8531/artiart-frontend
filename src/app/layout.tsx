
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { Providers } from '../Providers'
import React, { Suspense } from 'react';
import Head from "next/head";
import icon from "../../public/assets/images/favicon.ico"
import Link from "next/link";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Artiart",
  description: "Artiart UAE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>

    <html lang="en">
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
