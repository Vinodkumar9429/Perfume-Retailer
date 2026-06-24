import { CldImage } from "next-cloudinary";

type HeroImageProps = {
  preload?: boolean;
  variant?: "responsive" | "mobile";
};

const HeroImage = ({
  preload = true,
  variant = "responsive",
}: HeroImageProps) => {
  if (variant === "mobile") {
    return (
      <div className="relative flex h-full w-full items-center justify-center">
        <CldImage
          src="HeroM"
          alt="Background"
          fill
          preload={preload}
          format="auto"
          quality="80"
          className="block object-cover object-center dark:hidden"
        />

        <CldImage
          src="darkHeroM"
          alt="Background"
          fill
          preload={preload}
          format="auto"
          quality="80"
          className="hidden object-cover object-center dark:block"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative flex justify-start items-center">
      <CldImage
        src="HeroM"
        alt="Background"
        fill
        preload={preload}
        format="auto"
        quality={"80"}
        className="object-cover object-center block md:hidden dark:hidden"
      />

      <CldImage
        src="Hero"
        alt="Background"
        fill
        preload={preload}
        format="auto"
        quality={"auto:best"}
        className="object-cover object-center hidden md:block dark:md:hidden"
      />

      <CldImage
        src="darkHeroM"
        alt="Background"
        fill
        preload={preload}
        format="auto"
        quality={"80"}
        className="object-cover object-center hidden dark:block dark:md:hidden"
      />

      <CldImage
        src="darkHero1"
        alt="Background"
        fill
        preload={preload}
        format="auto"
        quality={"auto:best"}
        className="object-cover object-center hidden dark:md:block"
      />
    </div>
  );
};

export default HeroImage;
