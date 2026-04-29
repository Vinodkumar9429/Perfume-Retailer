"use client";
import ProductCard from "@/features/perfumes/components/ProductCard";

interface tempProductType {
  tempProducts: {
    id: string;
    name: string;
    brand: string;
    publicImageUrl: string;
    gender: string;
    price: number;
    rating: number;
  }[]
}

const PerfumeGrid = ({ tempProducts }: tempProductType) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  place-content-center place-items-center py-30 gap-y-16 px-2 md:px-5">
      {tempProducts.map((el) => (
        <ProductCard
          key={el.id}
          brand={el.brand}
          gender={el.gender}
          id={el.id}
          name={el.name}
          price={el.price}
          publicImageUrl={el.publicImageUrl}
          rating={el.rating}
        />
      ))}
    </div>
  );
};

export default PerfumeGrid;
