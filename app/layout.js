import "../src/globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Analytics } from "@vercel/analytics/react";
import { GoogleTagManager } from '@next/third-parties/google' 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <GoogleTagManager gtmId="G-1GNX7VH5E3"/>
        <Analytics />
        <Header />
        <main className="flex-grow justify-center content-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
