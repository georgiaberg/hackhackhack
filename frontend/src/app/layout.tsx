"use client";

import "./globals.scss";
import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import { Nav } from "./shared/nav";
import React from "react";
import { Footer } from "./shared/footer";
import Head from "next/head";

const font = Newsreader({ weight: ["300", "400"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Afterthought",
  description: "An AI-assisted reflection tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
