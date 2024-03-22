"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useFirebase } from "../../context/Contextusers";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import User from "@/app/components/User";
import { db } from "@/firebase/firebase";
type User = {
  id: string;
  Email: string;
  role: string;
};
export default function Page() {
  const { firestore } = useFirebase();
  const [data, setData] = useState<User[]>([]); // Adjust the type based on your data structure

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "users")); // Replace 'yourCollection' with your collection name
        const newData: any[] = [];
        querySnapshot.forEach((doc) => {
          newData.push({ id: doc.id, ...doc.data() });
        });
        setData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [firestore]);
  console.log(data);
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });
  const mainuser = session?.data?.user?.email;
  const filterduser = data.find((user) => user.Email === mainuser);
  console.log(filterduser);
  return (
    <div className="bg-slate-800 w-full text-start flex flex-col items-stretch p-8">
      {data?.map((user) => {
        console.log(user);
        return <User key={user.id} {...user} />;
      })}
    </div>
  );
}
