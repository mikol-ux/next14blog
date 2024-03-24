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
  const [user, setUser] = useState<string | null | undefined>();
  const [main, setMain] = useState<User | undefined>();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });

  const fetchData = async () => {
    try {
      const userEmail = session?.data?.user?.email;
      const response = await Userdata();
      console.log(response);
      const mainUser = response.find((user) => {
        user.Email === userEmail;
      });
      console.log(userEmail);
      console.log(mainUser);
      setMain(mainUser);
      setUser(userEmail);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };
  useEffect(() => {
    fetchData(); // Fetch the first page on component mount
  }, [main, user]);
  return (
    <div className="p-8 text-emerald-600">
      <div className="text-black">{session?.data?.user?.email}</div>
      <div className="bg-black">
        <p>{main?.Email}</p>
        <p>{main?.Username}</p>
        <p>{main?.role}</p>
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
