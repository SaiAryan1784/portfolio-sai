import type { Metadata } from "next";
import "./globals.css";
import DynamicTitleHandler from "./components/DynamicTitleHandler";
import Navbar from "./(sections)/Navbar";
import Goku from "./components/Goku";
// No need to import favicon from public directory

export const metadata: Metadata = {
  title: "Sai's Portfolio",
  description: "Created by Sai Aryan Goswami",
  icons: {
    icon: [
      { rel: 'icon', url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: [{ url: '/favicon.ico' }],
    apple: [
      { url: '/luffydp.jpg' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Goku/>
        <Navbar />
        {children}
        <DynamicTitleHandler />
      </body>
    </html>
  );
}
