import { Rating, ThinStar } from "@smastrom/react-rating";

const myStyles = {
  activeFillColor: "#C5A059",
  inactiveFillColor: "#D1D5DB",
  itemShapes: ThinStar,
};

export default function ProductRating({ rating }: { rating: number }) {
  return (
    <Rating 
    style={{ maxWidth: 110 }} 
    value={rating} 
    readOnly 
    itemStyles={myStyles} />
  );
}
