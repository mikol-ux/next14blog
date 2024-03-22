"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import {
  addDoc,
  collection,
  serverTimestamp,
  QuerySnapshot,
  getDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/firebase/firebase";
import Loading from "@/app/components/Loading";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const BlogPublishPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState<File | null | undefined>(null);
  const [video, setVideo] = useState<File | null | undefined>(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); // New state for category
  const [Load, isLoading] = useState<boolean>(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file);
  };

  const handleVideoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setVideo(file);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value.replace(/\//g, ""); // Remove any slashes
    setCategory(selectedCategory);
  };

  const handlePublish = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      isLoading(true);
      let imageUrl = "";
      let videoUrl = "";

      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      if (video) {
        const videoRef = ref(storage, `videos/${video.name}`);
        await uploadBytes(videoRef, video);
        videoUrl = await getDownloadURL(videoRef);
      }

      // Add blog post to the relevant category collection
      if (category && title && description) {
        // Check if category is a non-empty string
        /*  const QuerySnapShot = await getDocs(collection(db, "blogposts"));
        const NewData: any[] = [];
        QuerySnapShot.forEach((doc) => {
          NewData.push({ id: doc.id, ...doc.data() });
        }); */

        const sanitizedCategory = category.replace(/\//g, "");
        const postCollectionRef = collection(db, sanitizedCategory);

        const postDoc = await addDoc(postCollectionRef, {
          title,
          author,
          imageUrl,
          videoUrl,
          description,
          sanitizedCategory,
          timestamp: serverTimestamp(),
        });
        // Create 'mycomments' subcollection within the newly added blog post document
        if (postDoc.id) {
          const commentsCollectionRef = collection(
            postCollectionRef,
            postDoc.id,
            "mycomments"
          );
          // You can add initial comments if needed
          /*  await addDoc(commentsCollectionRef, {
            comment: "Initial comment",
            author: "Admin",
            timestamp: serverTimestamp(),
          }); */
          console.log("Blog post and comments added successfully!");
        }
      } else {
        console.error("Category, title, and description are required.");
      }
      isLoading(false);
    } catch (error) {
      console.error("Error adding blog post:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-6">
      <h1 className="text-3xl mb-6">Blog Publish Page</h1>
      <form onSubmit={handlePublish}>
        <label className="block mb-4">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2 mt-2 w-full bg-slate-950"
          />
        </label>
        {/* Other input fields */}
        <label className="block mb-4">
          Image Upload:
          <input type="file" onChange={handleImageUpload} className="mt-2" />
        </label>
        <label className="block mb-4">
          Video Upload:
          <input type="file" onChange={handleVideoUpload} className="mt-2" />
        </label>
        <label className="block mb-4">
          Category:
          <select
            value={category}
            onChange={handleCategoryChange}
            className="border rounded p-2 mt-2 w-full"
          >
            <option value="">Select a category</option>
            <option value="tech">Technology</option>
            <option value="travel">Travel</option>
            <option value="fashion">fashion</option>
            {/* Add more categories as needed */}
          </select>
        </label>
        <label className="block mb-4 text-slate-950">
          Description:
          <ReactQuill
            theme="snow"
            value={description}
            onChange={(value) => setDescription(value)}
            className="mt-2"
          />
        </label>
        {Load === true ? (
          <Loading />
        ) : (
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Publish
          </button>
        )}
      </form>
    </div>
  );
};

export default BlogPublishPage;
