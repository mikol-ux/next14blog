import React, { useEffect } from "react";
import { useState } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { db } from "@/firebase/firebase";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  addDoc,
  serverTimestamp,
  getFirestore,
  onSnapshot,
  setDoc,
  snapshotEqual,
  DocumentSnapshot,
} from "firebase/firestore";
import Image from "next/image";
import Comment from "./Comment";
import { fetchComments } from "@/lib/TechPost";
type BlogPost = {
  id: string;
  title: string;
  author?: string;
  description: string;
  sanitizedCategory: string;
  imageUrl?: string;
  videoUrl?: string;
  timestamp?: {
    seconds: number;
    nanoseconds: number;
  };
};
type commentstype = {
  id: string;
  content: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
};
const Singlepost: React.FC<BlogPost> = ({
  id,
  title,
  author,
  description,
  sanitizedCategory,
  imageUrl,
  videoUrl,
  timestamp,
}) => {
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<commentstype[]>([]);

  useEffect(() => {
    const fetchCommentsData = async () => {
      try {
        const commentsoutput = await fetchComments(sanitizedCategory, id);
        if (commentsoutput) {
          setComments(commentsoutput); // Assuming commentsoutput is an array of comment objects
        } else {
          console.error("Invalid comment data");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchCommentsData();
  }, [id, sanitizedCategory]);

  const handleCommentSubmit = async () => {
    if (commentInput.trim() === "") return;

    try {
      // Add the comment to Firestore
      const commentRef = collection(
        db,
        `${sanitizedCategory}/${id}/mycomments`
      );
      const newCommentRef = await addDoc(commentRef, {
        content: commentInput,
        timestamp: serverTimestamp(),
      });

      // Retrieve the added comment document
      const newCommentDoc = await getDoc(newCommentRef);

      // Check if newCommentDoc is truthy before accessing its properties
      if (newCommentDoc) {
        // Update the local comments state with the new comment
        setComments((prevComments) => [
          ...prevComments,
          {
            id: newCommentRef.id,
            content: commentInput,
            timestamp: newCommentDoc.data()?.timestamp, // Use optional chaining
          },
        ]);
      }

      // Clear the comment input
      setCommentInput("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const formatDate = (timestamp?: { seconds: number; nanoseconds: number }) => {
    if (!timestamp) {
      return " ";
    }

    const date = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );
    return date.toLocaleString("en-US");
  };
  return (
    <div className="w-full">
      <div className="w-[80%] mx-auto flex flex-col items-center justify-center">
        <div className="py-4">
          <p className="text-4xl font-bold text-center">{title}</p>
          <div className="flex justify-evenly items-center text-xl mt-3">
            <p>okoye ikechukwu micheal{author}</p>
            <p>{sanitizedCategory}</p>
            <p>{formatDate(timestamp)}</p>
          </div>
        </div>
        {imageUrl && (
          <div className="relative w-[800px] h-auto aspect-video mb-4">
            <Image src={imageUrl} alt={title} fill className="object-contain" />
          </div>
        )}
        {videoUrl && (
          <div className="relative w-[800px]">
            <video controls preload="auto">
              <source src={videoUrl} type="video/mp4" />
              <track
                src={videoUrl}
                kind="subtitles"
                srcLang="en"
                label="English"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        <div className="mt-6 px-7 w-[700px]">
          <div
            className="mb-4 text-xl mt-6"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="flex justify-between w-[70%] border border-black rounded-2xl p-2">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="border-none border-gray-300 p-2 rounded mr-2 focus:outline-none w-[400px]"
              placeholder="Write a comment..."
            />
            <button
              onClick={handleCommentSubmit}
              className=" text-white px-2 py-1 rounded focus:outline-none"
            >
              <RiSendPlane2Fill className="text-3xl text-slate-400" />
            </button>
          </div>
        </div>
        <div className="w-[60%] flex justify-start items-start flex-col gap-6 mt-6 mb-8">
          {comments?.map((singlecomment) => (
            <Comment key={singlecomment.id} {...singlecomment} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Singlepost;
