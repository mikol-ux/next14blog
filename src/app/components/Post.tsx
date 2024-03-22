"use client";
import { collection, doc, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
type BlogPost = {
  id: string;
  title: string;
  author: string;
  description: string;
  sanitizedCategory: string;
  imageUrl?: string;
  videoUrl?: string;
};

const Post: React.FC<BlogPost> = ({
  id,
  title,
  author,
  description,
  sanitizedCategory,
  imageUrl,
  videoUrl,
}) => {
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<string[]>([]); // State to hold comments

  return (
    <div className="flex gap-6 border-b-2 border-neutral-900 w-[800px] pb-2 m-4">
      {imageUrl && (
        <div className="relative w-full h-full max-h-[150px] max-w-[150px] aspect-square">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded"
          />
        </div>
      )}

      <div>
        <div className="flex justify-evenly">
          <p className="text-gray-600">Author: {author}</p>
          <p className="bg-black text-white rounded pl-1 pr-1 m-1">
            {sanitizedCategory}
          </p>
        </div>
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>

        <div
          className="text-gray-700 mb-4 line-clamp-5"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
};

export default Post;
