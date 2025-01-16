import "../src/globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow justify-center content-center">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
