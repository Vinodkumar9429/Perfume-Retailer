import { Rating, ThinStar } from "@smastrom/react-rating"

const myStyles = {
  activeFillColor: "#C5A059",
  inactiveFillColor: "#D1D5DB",
  itemShapes: ThinStar,
};


const TestimonialsCard = ({name, review} : {name : string, review : string}) => {
  return (
    <div className='max-w-60 w-full max-h-80 h-full border p-4 rounded-2xl mx-3'>
      <h3 className="text-center font-semibold">{name}</h3>      
      <Rating
      style={{maxWidth:90}}
      value={5}
      readOnly
      itemStyles={myStyles}
      className="mx-auto"
       />

       <p className="pt-12 font-light">{review}</p>
    </div>
  )
}

export default TestimonialsCard
