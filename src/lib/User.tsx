import { app, db, auth, storage } from "@/firebase/firebase";

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

export const Userdata = async () => {
  try {
    const QuerySnapShot = query(collection(db, "users"));
    const q = await getDocs(QuerySnapShot);
    const NewData: any[] = [];
    q.forEach((doc) => {
      NewData.push({ id: doc.id, ...doc.data() });
    });

    return NewData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
