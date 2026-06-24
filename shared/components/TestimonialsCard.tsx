import { Quote } from "lucide-react";
import { Rating, ThinStar } from "@smastrom/react-rating";
import { Badge } from "@/shared/components/ui/badge";

const myStyles = {
  activeFillColor: "#C5A059",
  inactiveFillColor: "#D1D5DB",
  itemShapes: ThinStar,
};


const TestimonialsCard = ({name, review} : {name : string, review : string}) => {
  return (
    <article className="mx-3 flex w-[18rem] shrink-0 flex-col rounded-[1.75rem] border border-foreground/10 bg-background/90 p-5 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge
            variant="outline"
            className="border-foreground/10 bg-background/80 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
          >
            Verified note
          </Badge>
          <h3 className="mt-4 text-base font-medium text-foreground">{name}</h3>
          <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Customer voice
          </p>
        </div>

        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-foreground/5 text-[#C5A059]">
          <Quote className="size-5" />
        </div>
      </div>

      <Rating
        style={{ maxWidth: 90 }}
        value={5}
        readOnly
        itemStyles={myStyles}
        className="mt-4"
      />

      <p className="mt-4 text-sm leading-7 text-muted-foreground">{review}</p>

      <div className="mt-6 h-px w-full bg-gradient-to-r from-[#E5C3A6]/70 via-foreground/10 to-transparent" />

      <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
        Bought from Aventrail
      </p>
    </article>
  )
}

export default TestimonialsCard
