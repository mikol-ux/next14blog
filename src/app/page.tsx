"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import MyComponent from "./components/allusers";
import Image from "next/image";
import NavBar from "./components/NavBar";
import Card from "./components/Card";
import Fashion from "./components/Fashion";
import Travel from "./components/Travel";
import { Userdata } from "@/lib/User";
import { useState, useCallback, useEffect } from "react";
type User = {
  id: string;
  Email: string;
  role: string;
  Username: string;
};
export default function Home() {
  const [user, setUser] = useState<User[] | null>(null);
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });
  const userEmail = session?.data?.user?.email;
  const fetchData = async () => {
    try {
      const response = await Userdata();
      console.log(response);
      setUser(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };
  useEffect(() => {
    fetchData(); // Fetch the first page on component mount
  }, []);
  return (
    <div className="p-8 text-emerald-600">
      <div className="text-black">{session?.data?.user?.email}</div>
      <div className="bg-black">
        <p>{}</p>
        <p>{}</p>
        <p>{}</p>
      </div>
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
