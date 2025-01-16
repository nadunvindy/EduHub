import "../src/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "./components/header";
import Footer from "./components/footer";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
            <GoogleAnalytics gaId="G-1GNX7VH5E3" />

      <body className="flex flex-col min-h-screen">
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
