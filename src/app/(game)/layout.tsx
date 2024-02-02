import type { Metadata } from "next";
import "@/styles/globals.css";
import { Providers } from "@/styles/providers";

export const metadata: Metadata = {
  title: {
    template: "%s | 你比我猜",
    default: "你比我猜",
  },
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
