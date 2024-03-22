"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import MyComponent from "./components/allusers";
import Image from "next/image";
import NavBar from "./components/NavBar";
import Card from "./components/Card";
import Fashion from "./components/Fashion";
import Travel from "./components/Travel";

export default function Home() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });
  return (
    <div className="p-8 text-emerald-600">
      <div className="text-black">{session?.data?.user?.email}</div>
      <button className="text-black" onClick={() => signOut()}>
        Logout
      </button>
      <Card />
      <Fashion />
      <Travel />
    </div>
  );
}

Home.requireAuth = true;
