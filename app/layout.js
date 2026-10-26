import "./globals.css";

export const metadata = {
  title: "Spacebar — Create meaningful collaborations",
  description: "Spacebar is the all-in-one platform that helps brands and creators collaborate and grow together.",
  keywords: ["SaaS", "launch platform", "product analytics", "startup tools"],
};

export default function RootLayout({ children }) {
  return <html lang="en"><body className="min-h-screen flex flex-col font-sans">{children}</body></html>;
}
