
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Toaster } from 'sonner';

import StateProvider from "@/components/state-provider";
import { cn } from "@/lib/utils/cn";
import "./globals.css";

const fontSans = Inter({ subsets: ["latin"], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('font-sans', fontSans.variable)}>
      <SessionProvider>
        <StateProvider>
            {children}
            <Toaster />
        </StateProvider>
      </SessionProvider>
      </body>
    </html>
  );
}
