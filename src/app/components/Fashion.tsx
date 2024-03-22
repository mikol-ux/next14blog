import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Fashion() {
  return (
    <div>
      <div className="flex items-center width-full text-[18px] font-semibold m-4">
        <span className="bg-black h-[2px] flex-1 m-[10px]"></span>
        <span className="block text-4xl font-bold text-gray-900 italic">
          Fashion
        </span>
        <span className="bg-black h-[2px] flex-1 m-[10px]"></span>
      </div>
      <div className="flex gap-8 m-1">
        <div className="flex-1 relative">
          <div className="relative w-full h-full max-h-[700px] max-w-[700px] aspect-square group-hover:opacity-100 transition-opacity duration-500">
            <Image
              src="/Visionpro.jpg"
              alt="codingzz"
              fill
              className="object-cover transition-transform duration-500 transform group-hover:translate-x-0"
            />
          </div>
          <div className="p-6 absolute bottom-4 left-2 ">
            <h1 className="mb-4 text-4xl font-bold transition-transform duration-500 transform group-hover:translate-y-0">
              apple vision pro spells the future
            </h1>
            <Link
              href="/"
              className="p-1 mt-8 bg-emerald-800 bottom-0 rounded font-bold text-xl text-black"
            >
              {" "}
              Read More
            </Link>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex gap-6 p-1">
            <div className="relative w-[150px] h-[150px] aspect-square flex-1">
              <Image
                src="/coding.png"
                alt="codingzz"
                fill
                className="object-cover"
              />
            </div>
            <div className="">
              <h1 className="text-xl font-semibold">
                apple vision pro spells the future
              </h1>
              <p className="text-md">
                “ dd an excerpt from your personal biography, or simply let the
                world know who you are and what you have to offer. Connect with
                your site visitor’s on a personal level and make sure that your
                site.
              </p>
            </div>
          </div>
          <div className="flex gap-6 p-1">
            <div className="relative w-[150px] h-[150px] aspect-square flex-1">
              <Image
                src="/coding.png"
                alt="codingzz"
                fill
                className="object-cover"
              />
            </div>
            <div className="">
              <h1 className="text-lg font-semibold">
                apple vision pro spells the future
              </h1>
              <p className="text-md">
                “ dd an excerpt from your personal biography, or simply let the
                world know who you are and what you have to offer. Connect with
                your site visitor’s on a personal level and make sure that your
                site.
              </p>
            </div>
          </div>
          <div className="flex gap-6 p-1">
            <div className="relative w-[150px] h-[150px] aspect-square flex-1">
              <Image
                src="/coding.png"
                alt="codingzz"
                fill
                className="object-cover"
              />
            </div>
            <div className="">
              <h1 className="text-lg font-semibold">
                apple vision pro spells the future
              </h1>
              <p className="text-md">
                “ dd an excerpt from your personal biography, or simply let the
                world know who you are and what you have to offer. Connect with
                your site visitor’s on a personal level and make sure that your
                site.
              </p>
            </div>
          </div>
          <div className="flex gap-6 p-1">
            <div className="relative w-[150px] h-[150px] aspect-square flex-1">
              <Image
                src="/coding.png"
                alt="codingzz"
                fill
                className="object-cover"
              />
            </div>
            <div className="">
              <h1 className="text-lg font-semibold">
                apple vision pro spells the future
              </h1>
              <p className="text-md">
                “ dd an excerpt from your personal biography, or simply let the
                world know who you are and what you have to offer. Connect with
                your site visitor’s on a personal level and make sure that your
                site.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
