import { app, db, auth, storage } from "@/firebase/firebase";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  setDoc,
  snapshotEqual,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";

export const fetchPosts = async (click: string) => {
  try {
    const QuerySnapShot = await getDocs(collection(db, click));
    const NewData: any[] = [];
    QuerySnapShot.forEach((doc) => {
      NewData.push({ id: doc.id, ...doc.data() });
    });
    console.log(NewData);
    return NewData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const subscribeToPosts = (setData: Function, click: string) => {
  const postCollection = collection(db, click);

  const unsubscribe = onSnapshot(postCollection, (snapshot) => {
    const changes = snapshot.docChanges();

    setData((prevData: any[]) => {
      let newData = [...prevData];

      changes.forEach((change) => {
        const { doc, type } = change;
        const updatedPost = { id: doc.id, ...doc.data() };

        if (type === "added") {
          const exists = newData.some((post) => post.id === doc.id);
          if (!exists) {
            newData.push(updatedPost);
          }
        } else if (type === "modified") {
          const index = newData.findIndex((post) => post.id === doc.id);
          if (index !== -1) {
            newData[index] = updatedPost;
          }
        } else if (type === "removed") {
          newData = newData.filter((post) => post.id !== doc.id);
        }
      });

      return newData;
    });
  });

  return unsubscribe;
};
