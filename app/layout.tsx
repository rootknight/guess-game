import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import Header from "@/app/ui/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "你比我猜",
  description: "你来比划我来猜",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" className="light">
      <body className="font-sans antialiased">
        <Providers>
          <div className="container mx-auto flex flex-col gap-4 p-4 h-dvh relative">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
