"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomeFR() {
  const router = useRouter();

  return (
    <main className="relative flex flex-col items-center justify-center h-screen">
      <div className="absolute top-10 left-1/2 -translate-x-1/2">
        <Image
          src="/indorama.jpeg"
          alt="Logo Indorama"
          width={250}
          height={100}
          className="object-contain"
        />
      </div>

     <div>
        <form>

        </form>
    </div>
    </main>
  );
}
