"use client";
import { LoginForm } from "@/shared/components/login-form";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="bg-muted flex flex-col items-center justify-center gap-6 p-6 md:p-10 w-screen h-screen min-h-screen relative">
      <CldImage
        src="bgImage"
        alt="Background"
        preload
        height={2048}
        width={1312}
        format="auto"
        quality={"80"}
        className="absolute inset-0 object-cover object-center block md:hidden  w-screen h-screen"
      />

      <CldImage
        src="bgImageD"
        alt="Background"
        width={2048}
        height={1312}
        preload
        format="auto"
        quality={"auto:best"}
        className="absolute inset-0 object-cover object-center hidden md:block w-screen h-screen"
      />
      <div className="flex w-full max-w-sm flex-col gap-6 relative z-50">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium text-xl tracking-wide"
        >
          <p className="font-lejour text-white">AVENTRAIL</p>
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
