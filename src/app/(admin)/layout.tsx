import type { Metadata } from "next";
import "@/styles/globals.css";
import { Providers } from "@/styles/providers";

export const metadata: Metadata = {
  title: {
    template: "%s | 你比我猜后台",
    default: "你比我猜后台",
  },
  description: "你来比划我来猜",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className="font-sans antialiased text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
