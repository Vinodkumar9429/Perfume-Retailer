"use client";
import { SignupForm } from "@/shared/components/signup-form";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="bg-muted flex flex-col items-center justify-center gap-6 p-6 md:p-10 w-screen h-screen">
      {/* <div className="absolute inset-0 bg-[url('/bgImage.png')] md:bg-[url('/bgImageD.png')] bg-no-repeat bg-center bg-cover w-screen h-screen" /> */}
      <CldImage
        src="bgImage"
        alt="Background"
        height={2048}
        preload
        width={1312}
        format="auto"
        quality={"80"}
        className="absolute inset-0 object-cover object-center block md:hidden w-screen h-screen"
      />

      <CldImage
        src="bgImageD"
        alt="Background"
        width={2048}
        height={1312}
        preload
        format="auto"
        quality={"auto:best"}
        className="absolute top-0 inset-0 object-cover object-top hidden md:block w-screen h-screen"
      />

      <div className="flex w-full max-w-sm flex-col gap-6 relative z-50">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium text-xl tracking-wide"
        >
          <p className="font-lejour text-white">AVENTRAIL</p>
        </Link>
        <SignupForm />
      </div>
    </div>
  );
}
