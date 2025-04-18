"use client";

import "../src/globals.css";
import "../src/cookieconsent.css"
import Header from "./components/header";
import Footer from "./components/footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleTagManager } from "@next/third-parties/google";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <GoogleTagManager gtmId="GTM-NQ5FRSZR" />
        <Analytics />
        <SpeedInsights />
        <Header />
        <main className="flex-grow justify-center content-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
