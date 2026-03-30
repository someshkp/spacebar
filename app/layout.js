import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Spacebar — Create meaningful collaborations",
  description:
    "Spacebar is the all-in-one platform that helps brands and creators collaborate and grow together.",
  keywords: ["SaaS", "launch platform", "product analytics", "startup tools"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col font-sans">{children}</body>
    </html>
  );
}
