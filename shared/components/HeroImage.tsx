import { CldImage } from "next-cloudinary";

const HeroImage = () => {
  return (
    <div className="w-full h-full relative -z-10 flex justify-start items-center">
      <CldImage
        src="HeroM"
        alt="Background"
        fill
        preload
        format="auto"
        quality={"80"}
        className="object-cover object-center block md:hidden dark:hidden"
      />

      <CldImage
        src="Hero"
        alt="Background"
        fill
        preload
        format="auto"
        quality={"auto:best"}
        className="object-cover object-center hidden md:block dark:md:hidden"
      />

      <CldImage
        src="darkHeroM"
        alt="Background"
        fill
        preload
        format="auto"
        quality={"80"}
        className="object-cover object-center hidden dark:block dark:md:hidden"
      />

      <CldImage
        src="darkHero1"
        alt="Background"
        fill
        preload
        format="auto"
        quality={"auto:best"}
        className="object-cover object-center hidden dark:md:block"
      />
    </div>
  );
};

export default HeroImage;
