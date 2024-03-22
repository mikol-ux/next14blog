import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Travel() {
  return (
    <div>
      <div className="flex items-center width-full text-[18px] font-semibold m-4">
        <span className="bg-black h-[2px] flex-1 m-[10px]"></span>
        <span className="block text-4xl font-bold text-gray-900 italic">
          Travel
        </span>
      </div>
      <div className="grid grid-cols-6 gap-6">
        <div className="flex flex-col gap-6 p-1">
          <div className="relative w-full h-full aspect-square">
            <Image
              src="/coding.png"
              alt="codingzz"
              fill
              className="object-cover"
            />
          </div>
          <div className="">
            <h1 className="text-sm font-medium">
              apple vision pro spells the future
            </h1>
            <p className="text-xs line-clamp-2 mt-2">
              “ dd an excerpt from your personal biography, or simply let the
              world know who you are and what you have to offer. Connect with
              your site visitor’s on a personal level and make sure that your
              site.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
