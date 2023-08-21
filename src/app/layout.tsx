"use client";

import { Toast } from "next-ts-lib";
import { CompanyContextProvider } from "@/context/companyContext";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Toast position="top_right" />
        <CompanyContextProvider>
        {children}
        </CompanyContextProvider>
      </body>
    </html>
  );
}
