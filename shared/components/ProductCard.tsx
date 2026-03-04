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
    <div className="relative flex flex-col border rounded-xl p-3 shadow-lg overflow-hidden">
      <Link
        href={link ? link : ""}
        className="hover:scale-90 transition-transform duration-500"
      >
        <ProductImage pubilcId={publicImageUrl} alt="" quality="auto" />
      </Link>
      <div className="px-3">
        <h3 className="font-general-sans font-bold text-xs pt-5">{brand}</h3>
        <h3 className="font-general-sans py-1">{name}</h3>
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col justify-center items-start">
            <ProductRating rating={rating} />
            <h3 className="py-1 font-general-sans">₹{price}</h3>
          </div>
          <div className="bg-foreground text-background px-4 py-2 rounded-full cursor-pointer">
            <ShoppingCart className="w-4 h-4" />
          </div>
        </div>

        <div className="absolute bg-background text-foreground px-4 py-2 rounded-full cursor-pointer top-3 right-3">
          <Heart className="w-4 h-4" />
        </div>
        <div className="bg-foreground text-background border px-4 py-2 rounded-full cursor-pointer flex justify-center items-center font-general-sans my-2 text-sm hover:bg-foreground/80 transition-color duration-500">
          Buy Now
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
