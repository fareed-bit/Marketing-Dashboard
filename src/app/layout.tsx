import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "./app-shell";
import { AuthSessionProvider } from "@/components/auth/session-provider";

export const metadata: Metadata = {
  title: "Barsys Marketing Dashboard",
  description: "Marketing team dashboard for Barsys — Brand, Creator & Affiliate management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <AuthSessionProvider>
          <AppShell>{children}</AppShell>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
