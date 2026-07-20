import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MindLens AI | Mental Health Text Classification",
  description: "AI-powered mental health text classification using DistilBERT.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <div className="flex min-h-screen relative">
          <Sidebar />
          <div className="flex-1 md:ml-64 flex flex-col min-h-screen relative z-10">
            <Navbar />
            <main className="flex-1 p-6 lg:p-8 animate-in fade-in duration-500">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
