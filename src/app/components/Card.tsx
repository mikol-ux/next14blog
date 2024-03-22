import Image from "next/image";
import Link from "next/link";
export default function Card() {
  return (
    <div>
      <div className="flex items-center width-full text-[18px] font-semibold m-4">
        {/*  <span className="bg-black h-[2px] flex-1 m-[10px]"></span> */}
        <span className="block text-4xl font-bold text-gray-900">Tech</span>
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
            <p className="mb-4 text-4xl font-bold transition-transform duration-500 transform group-hover:translate-y-0">
              apple vision pro spells the future
            </p>
            <Link
              href="/"
              className="p-1 mt-8 bg-emerald-800 bottom-0 rounded font-bold text-xl text-black"
            >
              {" "}
              Read More
            </Link>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-12">
          <div className="flex flex-col p-1 justify-evenly">
            <div className="relative w-full h-full aspect-square flex-1">
              <Image
                src="/coding.png"
                alt="codingzz"
                fill
                className="object-cover"
              />
            </div>
            <div className="">
              <p className="text-lg font-semibold">
                apple vision pro spells the future
              </p>
            </div>
          </div>
          <div className="flex flex-col p-1 justify-evenly">
            <div className="relative w-full h-full aspect-square flex-1 ">
              <Image
                src="/coding.png"
                alt="codingzz"
                fill
                className="object-cover"
              />
            </div>
            <div className="">
              <p className="text-lg font-semibold">
                apple vision pro spells the future
              </p>
            </div>
          </div>
          <div className="flex flex-col p-1 justify-evenly">
            <div className="relative w-full h-full aspect-square flex-1 ">
              <Image
                src="/coding.png"
                alt="codingzz"
                fill
                className="object-cover"
              />
            </div>
            <div className="">
              <p className="text-lg font-semibold">
                apple vision pro spells the future
              </p>
            </div>
          </div>
          <div className="flex flex-col p-1 justify-evenly">
            <div className="relative w-full h-full aspect-square flex-1 ">
              <Image
                src="/coding.png"
                alt="codingzz"
                fill
                className="object-cover"
              />
            </div>
            <div className="">
              <p className="text-lg font-semibold">
                apple vision pro spells the future
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
