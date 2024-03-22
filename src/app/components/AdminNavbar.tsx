import React from "react";
import Link from "next/link";

export default function AdminNavbar() {
  return (
    <div className="p-4 m-1 bg-blue-800 text-gray-300 flex flex-col gap-[50px]">
      <Link href="/Admindashboard/Users">Users</Link>
      <Link href="/Admindashboard/Publish">Publish</Link>
      <Link href="/Admindashboard/PostManagement">PostManagement</Link>
      <Link href="/Admindashboard/Analytics">Analytics</Link>
      <Link href="/Admindashboard/Storedblogpost">Scheduled post</Link>
    </div>
  );
}
