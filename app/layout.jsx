import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import "../assets/styles/globals.css";

export const metadata = {
  title: "Property Pulse",
  keywords: "Proptery, rental, real estate",
  description: "Find the perfect rental property",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
