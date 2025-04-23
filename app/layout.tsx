import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import AudioProvider from "./providers/AudioProvider";
import ConvexClerkProvider from "./providers/ConvexClerkProvider";
const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Podcastr",
  description: "Generate your podcasts using AI",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={manrope.className}>
      <body>
        <ConvexClerkProvider>
          <AudioProvider>{children}</AudioProvider>
        </ConvexClerkProvider>
      </body>
    </html>
  );
}
