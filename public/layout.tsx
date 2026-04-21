import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyGrowth Academy — The Compound Protocol",
  description: "MGA ends the internal sabotage. We install a Compounding Engine that forces your income, energy, and direction to stack instead of cancel.",
  openGraph: {
    title: "MyGrowth Academy — The Compound Protocol",
    description: "Stop vibrating in place. Build the system that compounds.",
    images: ['/logo-full.svg'],
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
