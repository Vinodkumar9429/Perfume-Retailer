import Image from "next/image"


const HeroImage = () => {
  return (
    <>
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
    </>
  )
}

export default HeroImage
