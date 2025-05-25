import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OFFERS - 求人管理システム",
  description: "求人・オファー作成・管理システム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
