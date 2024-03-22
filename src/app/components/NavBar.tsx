import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="flex items-center justify-between h-[100px]">
      <div className="flex gap-[10px] flex-1">
        <Image src="/facebook.png" alt="facebook" width={24} height={24} />
        <Image src="/instagram.png" alt="instagram" width={24} height={24} />
        <Image src="/tiktok.png" alt="tiktok" width={24} height={24} />
        <Image src="/youtube.png" alt="youtube" width={24} height={24} />
      </div>
      <div className="flex-1 text-center text-[36px] font-bold">mikeblog</div>
      <div className="flex items-center gap-[20px] flex-1 text-[20px]">
        <Link href="/">Homepage</Link>
        <Link href="/">Contact</Link>
        <Link href="/">About</Link>
      </div>
    </div>
  );
}
