"use client";
import React from "react";
import { useState, useEffect } from "react";
import { fetchPostById } from "@/lib/TechPost";
import Image from "next/image";
import { db } from "@/firebase/firebase";
import {
  Query,
  query,
  collection,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import Singlepost from "@/app/components/Singlepost";
import { getBlogPosts } from "@/lib/TechPost";

type Props = {
  params: {
    id: string;
  };
};
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
export default function Page({ params: { id } }: Props) {
  const [postData, setPostData] = useState<any>({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const post = await fetchPostById(id);
        console.log(post);

        // Ensure that post is not null before setting the state
        if (post) {
          setPostData(post);
        } else {
          console.error("Invalid post data");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchData();
  }, [id]);

  console.log(postData);
  console.log(postData.timestamp);
  return <Singlepost key={postData.id} {...postData} />;
}
