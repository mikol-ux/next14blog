import { app, db, auth, storage } from "@/firebase/firebase";
import { useSession } from "next-auth/react";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  snapshotEqual,
  where,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";
const session = useSession();
const userEmail = session?.data?.user?.email;

export const Userdata = async () => {
  try {
    const QuerySnapShot = query(collection(db, "users"));
    const q = await getDocs(QuerySnapShot);
    const NewData: any[] = [];
    q.forEach((doc) => {
      NewData.push({ id: doc.id, ...doc.data() });
    });

    return NewData.find((user) => user === userEmail);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
