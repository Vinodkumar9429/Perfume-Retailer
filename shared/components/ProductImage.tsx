import { CldImage } from "next-cloudinary"


interface ProductImagePropTypes {
  pubilcId : string,
  quality : "auto" | "auto:good" | "auto:best",
  alt : string
}

const ProductImage = ({pubilcId, quality, alt} : ProductImagePropTypes) => {
  return (
  <CldImage 
  src={pubilcId}
  width={370}
  height={400}
  crop="fill"
  gravity="center"
  format="auto"
  quality={quality ?? "auto"}
  alt={alt ? alt : ""}
  removeBackground
  // placeholder="blur" 
  // blurDataURL={`https://res.cloudinary.com/dt0t0dzyl/image/upload/w_20,q_1,e_blur:1000/${pubilcId}`}

/>)
}

export default ProductImage
