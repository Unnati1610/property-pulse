import "../assets/styles/globals.css";

export const metadata = {
  title: "Property Pulse",
  keywords: "Proptery, rental, real estate",
  description: "Find the perfect rental property",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
