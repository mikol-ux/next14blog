import { Inter } from "next/font/google";

import AdminNavbar from "../components/AdminNavbar";

const inter = Inter({ subsets: ["latin"] });

export default function AdmindashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen p-1">
        <AdminNavbar />
        {children}
      </body>
    </html>
  );
}
