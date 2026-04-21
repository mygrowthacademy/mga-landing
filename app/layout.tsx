import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyGrowth Academy — The Compound Protocol",
  description: "MGA ends the internal sabotage. We install a Compounding Engine that forces your income, energy, and direction to stack instead of cancel.",
  openGraph: {
    title: "MyGrowth Academy — The Compound Protocol",
    description: "Stop vibrating in place. Build the system that compounds.",
    images: ['/logo.png'],
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
