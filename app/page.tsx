"use client";
import { ArrowUp } from "@/components/animate-ui/icons/arrow-up";
import { BestSellers } from "@/mock/BestSellers.products";
import Header from "@/shared/components/Header";
import HeroImage from "@/shared/components/HeroImage";
import ProductCard from "@/shared/components/ProductCard";
import { Button } from "@/shared/components/ui/button";
import { FancyText } from "@/shared/components/ui/fancy-text";
import { Marquee } from "@/shared/components/ui/marquee";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useState } from "react";

const brandImages = [
  "brand1",
  "brand2",
  "brand3",
  "brand4",
  "brand5",
  "brand8",
  "brand7",
];

const Page = () => {
  const [bestSellersGender, setBestSellersGender] = useState<"male" | "female">(
    "male",
  );
  return (
    <div className="w-full h-dvh min-h-dvh">
      <Header />
      <div className="w-full h-full absolute inset-0 z-0 flex justify-center items-start flex-col">
        <div className="relative w-full h-full">
          <HeroImage />
          <h2 className="text-2xl md:text-5xl text-foreground absolute top-[38%] md:top-[50%] left-[51%] md:left-[20%] -translate-x-1/2 -translate-y-1/2 font-lejour">
            <FancyText
              fillClassName="text-foreground dark:text-[#E5C3A6]"
              stagger={0.06}
              duration={1.2}
              delay={0.4}
            >
              Discover
            </FancyText>
          </h2>
          <h2 className="text-2xl md:text-5xl text-foreground absolute top-[41%] md:top-[54%] left-[51%] md:left-[20%] -translate-x-1/2 -translate-y-1/2 font-general-sans font-light">
            <p className="text-3xl md:text-5xl">Luxury</p>
          </h2>
          {/* <RainbowButton
            variant={"default"}
            color="#E5C3A6"
            className="absolute top-[70%] left-[50%] -translate-x-1/2 -translate-y-1/2 font-general-sans"
          >
            Shop Now <ArrowUp className="rotate-45" />
          </RainbowButton> */}

          <Link href="/" className="absolute top-[70%] left-[50%] -translate-x-1/2 -translate-y-1/2 font-general-sans bg-foreground dark:text-[#E5C3A6] dark:bg-background border border-white/40 text-background cursor-pointer px-4 flex justify-between gap-4 items-center py-1.5 rounded-xl group">
            Shop Now <ArrowUp className="rotate-45 h-5 w-5 cursor-pointer group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-500" />
          </Link>
        </div>
      </div>
      <div className="w-full h-40 mt-[110vh] flex flex-col items-center">
        <h2 className="px-2 md:px-16 text-xl md:text-2xl font-lejour uppercase  font-extralight relative w-full flex flex-row-reverse justify-center items-center h-20">
          <span className="border-t border-foreground/25 w-full h-1"></span>
          <span className="bg-background tracking-widest px-3">Brands</span>
        </h2>
        <div className="w-full flex h-26 justify-center items-center overflow-x-hidden mt-20 overflow-hidden">
          <Marquee pauseOnHover className="[--duration:20s] ">
            {brandImages.map((id, i) => (
              <div
                key={id}
                className="relative w-26 h-18 md:w-32 md:h-20 overflow-hidden rounded-xl mx-6 md:mx-16"
              >
                <CldImage
                  fill
                  alt={`Brand logo ${i + 1}`}
                  format="auto"
                  quality="80"
                  src={id}
                  sizes="(max-width: 768px) 104px, 128px"
                  className="object-center object-cover dark:invert-96 contrast-200 dark:contrast-130 opacity-60 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>

      <div className="flex flex-col items-center mt-40">
        <h2 className="px-2 md:px-16 text-xl md:text-2xl font-lejour uppercase  font-extralight relative w-full flex flex-row-reverse justify-center items-center h-20">
          <span className="border-t border-foreground/25 w-full h-1"></span>
          <span className="bg-background tracking-widest px-3 whitespace-nowrap">
            Best Sellers
          </span>
        </h2>
        <div className="w-full flex justify-center items-center md:justify-end h-20 gap-1 md:px-34 font-general-sans">
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => setBestSellersGender("male")}
          >
            Men
          </Button>
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => setBestSellersGender("female")}
          >
            Women
          </Button>
          <Button className="cursor-pointer underline" variant="outline">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-30 mt-4 px-2 md:px-0">
          {BestSellers.filter((p) => p.gender === bestSellersGender).map(
            (p) => (
              <ProductCard
                key={p.id}
                brand={p.brand}
                gender={p.gender}
                id={p.id}
                name={p.name}
                price={p.price}
                publicImageUrl={p.publicImageUrl}
                rating={p.rating}
              />
            ),
          )}
        </div>
      </div>

      <div className="w-screen h-screen min-h-screen flex justify-center items-center font-general-sans">
        <h3>Under Development, Keep Visiting for Updates.</h3>
      </div>
    </div>
  );
};

export default Page;
