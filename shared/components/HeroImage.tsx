import Image from "next/image"


const HeroImage = () => {
  return (
    <div className="w-full h-full relative inset-0 -z-10 flex justify-start items-center">
       <Image
          src="/HeroM.png"
          alt="Background"
          fill
          priority
          className="object-cover object-center block md:hidden dark:hidden"
        />

        <Image
          src="/Hero.png"
          alt="Background"
          fill
          priority
          className="object-cover object-center hidden md:block dark:md:hidden"
        />

        <Image
          src="/darkHeroM.png"
          alt="Background"
          fill
          priority
          className="object-cover object-center hidden dark:block dark:md:hidden"
        />

        <Image
          src="/darkHero1.png"
          alt="Background"
          fill
          priority
          className="object-cover object-center hidden dark:md:block"
        />        
    </div>
  )
}

export default HeroImage
