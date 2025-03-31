import type { Metadata } from "next";
import "./globals.css";
import DynamicTitleHandler from "./components/DynamicTitleHandler";
import Navbar from "./(sections)/Navbar";
import Goku from "./components/Goku";

export const metadata: Metadata = {
  title: "Sai's Portfolio",
  description: "Created by Sai Aryan Goswami",
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
