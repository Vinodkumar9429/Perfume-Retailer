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
  crop="fit"
  gravity="center"
  format="auto"
  quality={quality ?? "auto"}
  alt={alt ? alt : ""}
  removeBackground
/>)
}

export default ProductImage
