import type { Metadata } from "next";
import "@/styles/globals.css";
import { Providers } from "@/styles/providers";

export const metadata: Metadata = {
  title: "后台|你比我猜",
  description: "后台|你来比划我来猜",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" className="light">
      <body className="font-sans antialiased w-full h-dvh">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
