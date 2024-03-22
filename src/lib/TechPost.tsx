import { app, db, auth, storage } from "@/firebase/firebase";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc,
  snapshotEqual,
  DocumentSnapshot,
  query,
  orderBy,
  limit,
  DocumentChange,
  where,
  getCountFromServer,
  startAfter,
  Query,
  startAt,
} from "firebase/firestore";
import {
  AggregateQuerySnapshot,
  AggregateField,
  DocumentData,
  QueryDocumentSnapshot,
  CollectionReference,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";
export interface BlogPost {
  id: string;
  title: string;
  author: string;
  description: string;
  sanitizedCategory: string;
  imageUrl?: string;
  videoUrl?: string;
  docSnapshot?: DocumentSnapshot<unknown>;
  data?: any;
}
export async function getStaticProps() {
  const blogPostsRef = collection(db, "tech"); // Replace with your collection name
  const postsQuery = query(blogPostsRef, orderBy("timestamp", "desc")); // Order by timestamp (descending)

  const querySnapshot = await getDocs(postsQuery);

  const data = querySnapshot.docs.map((doc) => doc.data());

  return {
    props: {
      data,
    },
  };
}
/* export async function getAllBlogPosts() {
  const blogPostsRef = collection(db, "tech"); // Replace with your collection name
  const postsQuery = query(blogPostsRef, orderBy("timestamp", "desc")); // Order by timestamp (descending)

  const querySnapshot = await getDocs(postsQuery);

  return querySnapshot.docs.map((doc) => doc.data() as BlogPost);
} */
export const getBlogPosts = async (
  Data: BlogPost[] | QueryDocumentSnapshot<DocumentData, DocumentData>[],
  currentPage: number,
  pageSize: number,
  lastDocSnapshot?: any
) => {
  const postsRef = collection(db, "tech"); // Replace with your collection name

  const queryConstraints = [orderBy("timestamp", "asc")]; // Order by creation date

  // Include pagination logic using startAfter if lastDocSnapshot is available
  if (lastDocSnapshot) {
    queryConstraints.push(startAfter(lastDocSnapshot) as any);
  }

  const quer = query(postsRef, ...queryConstraints, limit(pageSize));
  const snapshot = await getDocs(quer);

  /* const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    imageUrl: doc.data().imageUrl,
    videoUrl: doc.data().videoUrl,
    title: doc.data().title, // Include these properties
    author: doc.data().author, // Adapt field names if necessary
    description: doc.data().description,
    sanitizedCategory: doc.data().sanitizedCategory,
  })); */
  const data = lastDocSnapshot
    ? [...(Data as BlogPost[]), ...snapshot.docs]
    : snapshot.docs;
  const hasMore = snapshot.size === pageSize;
  console.log(data);
  return {
    data,
    hasMore,
    lastDocSnapshot:
      snapshot.docs.length === pageSize
        ? snapshot.docs[snapshot.docs.length - 1]
        : null,
  }; // Return lastDocSnapshot if there are more pages
};

export const fetchPostById = async (postId: string) => {
  try {
    const postDocRef = doc(db, "tech", postId);
    const postDoc = await getDoc(postDocRef);

    if (postDoc.exists()) {
      const postData = { id: postDoc.id, ...postDoc.data() };
      console.log(postData);
      return postData;
    } else {
      console.error("Post not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
};

export const fetchComments = async (sanitizedCategory: string, id: string) => {
  console.log(sanitizedCategory);
  console.log(id);
  try {
    const commentDocRef = collection(
      db,
      `${sanitizedCategory}/${id}/mycomments`
    );
    const commentDoc = await getDocs(commentDocRef);

    const commentsData = commentDoc.docs.map((doc) => {
      const commentData = doc.data();
      return {
        id: doc.id,
        content: commentData.content,
        timestamp: commentData.timestamp,
      };
    });

    console.log(commentsData, "comment data should be here ");
    return commentsData;
  } catch (error) {
    console.error("Error fetching comment:", error);
    return null;
  }
};
