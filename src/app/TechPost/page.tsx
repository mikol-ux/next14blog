"use client";
import { useEffect, useState, useCallback } from "react";

import Post from "@/app/components/Post";
import { getBlogPosts, BlogPost } from "@/lib/TechPost";
import Link from "next/link";
import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";

function TechPost() {
  const [Data, setData] = useState<
    BlogPost[] | QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [lastDocSnapshot, setLastDocSnapshot] =
    useState<DocumentSnapshot<unknown> | null>(null);
  const [error, setError] = useState<string | null>(null); // Initialize error state

  const fetchData = useCallback(
    async (page: number) => {
      setIsLoading(true);
      setError(null); // Reset error on new fetch

      try {
        const response = await getBlogPosts(
          Data,
          page,
          4,
          page === 1 ? null : lastDocSnapshot
        );

        setData(response.data as BlogPost[]);
        setHasMore(response.hasMore);
        setLastDocSnapshot(response.hasMore ? response.lastDocSnapshot : null); // Update lastDocSnapshot if necessary
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load posts. Please try again later."); // Set error state
      } finally {
        setIsLoading(false);
      }
    },
    [Data, lastDocSnapshot]
  );

  useEffect(() => {
    fetchData(1); // Fetch the first page on component mount
  }, [fetchData]); // Empty dependency array ensures it runs only once

  const handleNextPage = async () => {
    if (hasMore && !isLoading) {
      setCurrentPage(currentPage + 1);
      fetchData(currentPage + 1); // Pass the updated page number
    }
  };

  return (
    <div className="flex flex-col items-center border-2 border-black p-8">
      <ul>
        {Data.map((post) => (
          <li key={post.id}>
            <Link href={`/TechPost/${post.id}`}>
              <Post {...post.data()} />
            </Link>
          </li>
        ))}
      </ul>

      {hasMore && !isLoading && (
        <button onClick={handleNextPage}>Next Page</button>
      )}
    </div>
  );
}

export default TechPost;
