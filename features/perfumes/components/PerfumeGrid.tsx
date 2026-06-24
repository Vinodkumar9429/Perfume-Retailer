"use client";

import type { ReactNode } from "react";

import ProductCard from "@/features/perfumes/components/ProductCard";

export type PerfumeGridProduct = {
  id: string;
  name: string;
  brand: string;
  publicImageUrl: string;
  gender: string;
  price: number;
  rating: number;
};

interface TempProductType {
  tempProducts: {
    id: string;
    name: string;
    brand: string;
    publicImageUrl: string;
    gender: string;
    price: number;
    rating: number;
  }[];
  emptyState?: ReactNode;
}

const PerfumeGrid = ({ tempProducts, emptyState }: TempProductType) => {
  if (tempProducts.length === 0) {
    return (
      <div className="flex min-h-[24rem] w-full items-center justify-center px-2 py-10">
        {emptyState}
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 place-content-center place-items-center gap-y-16 px-2 py-10 md:grid-cols-2 md:px-5 lg:grid-cols-3">
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
