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
      <head>
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window, document, "clarity", "script", "wo1lc4pb16");` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
