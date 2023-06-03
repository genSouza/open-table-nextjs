import { Review } from "@prisma/client";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div>
      <h1 className="pb-5 mt-10 text-3xl font-bold border-b mb-7">
        {reviews.length === 0 && "No reviews yet"}
        {reviews.length > 0 &&
          `What ${reviews.length} ${
            reviews.length === 1 ? "person" : "people"
          } are
        saying`}
      </h1>
      <div>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
