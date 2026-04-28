import Link from "next/link"

const Footer = () => {
  return (
    <div className="w-[95%] bg-accent h-full md:h-100 flex flex-col md:flex-row justify-center items-center px-4 relative mx-auto rounded-2xl">
        <div className="w-full h-[30%] md:w-[30%] flex justify-center items-center md:h-full ">
            <h3 className="text-4xl md:text-4xl font-lejour">AVENTRAIL</h3>
        </div>
        <div className="w-full h-[30%] md:h-full md:w-[30%] flex flex-col justify-center items-center">
            <h3 className="text-sm md:text-lg font-lejour">Quick Links</h3>
            <ul className="w-full flex flex-col justify-center items-center font-general-sans font-light">
                <li>Home</li>
                <li>Products</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Privacy & Policy</li>
                <li>Terms & Conditions</li>
            </ul>
            
        </div>
        <div className="w-full h-[30%] md:h-full md:w-[30%] flex flex-col justify-center items-center">
            <h3 className="text-sm md:text-lg font-lejour">Our Store</h3>
            <p className="font-general-sans font-light text-center">Aventrail Luxury Fragrances, Unit 402, 4th Floor, Platinum Tower, MG Road, Gurugram Sector 25, Haryana, 122002, India.</p>
        </div>
      
      <div className="flex flex-col justify-center items-center w-full absolute bottom-4">
        <p className="font-light">Developed by - <Link className="font-semibold underline" target="_blank" href={"https://vinodevagency.vercel.app/"}>V Agency</Link></p>
        <p className="font-semibold">© 2026 AVENTRAIL. All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
