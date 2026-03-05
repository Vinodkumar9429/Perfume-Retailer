import { bestSellersType } from "@/mock/BestSellers.products";
import ProductImage from "@/shared/components/ProductImage";
import ProductRating from "@/shared/components/StarRating";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface BestSellersExtendedType extends bestSellersType {
    link?:string
}

const ProductCard = ({brand, name, price, publicImageUrl, rating, link} : BestSellersExtendedType) => {
  return (
    <div className="relative flex flex-col border rounded-xl p-3 shadow-lg overflow-hidden dark:border-white/20">
      <Link
        href={link ? link : ""}
        className="hover:scale-90 transition-transform duration-500 h-2/3"
      >
        <ProductImage pubilcId={publicImageUrl} alt="" quality="auto" />
      </Link>
      <div className="px-3 flex-1">
        <h3 className="font-general-sans font-bold text-xs pt-5">{brand}</h3>
        <h3 className="font-general-sans py-1">{name}</h3>
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col justify-center items-start">
            <ProductRating rating={rating} />
            <h3 className="py-1 font-general-sans">₹{price}</h3>
          </div>
          <div className="bg-foreground dark:bg-white/10 text-background dark:text-[#E5C3A6] px-4 py-2 rounded-full cursor-pointer hover:bg-foreground/80 hover:dark:bg-white/5 transition-color duration-500">
            <ShoppingCart className="w-4 h-4" />
          </div>
        </div>

        <div className="absolute bg-background text-foreground dark:text-[#E5C3A6] px-4 py-2 rounded-full cursor-pointer top-3 right-3">
          <Heart className="w-4 h-4" />
        </div>
        <div className="bg-foreground dark:bg-white/10 text-background dark:text-[#E5C3A6] border px-4 py-2 rounded-full cursor-pointer flex justify-center items-center font-general-sans my-2 text-sm hover:bg-foreground/80 hover:dark:bg-white/5 transition-color duration-500">
          Buy Now
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
