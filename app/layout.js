import "../src/globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Analytics } from "@vercel/analytics/react";
import { GoogleTagManager } from "@next/third-parties/google";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <GoogleAnalytics
          gaId="G-1GNX7VH5E3
"
        />
        <GoogleTagManager gtmId="GTM-NQ5FRSZR" />
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
