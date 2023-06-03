import Stars from "@/app/components/Stars";
import CalculateReviewRatingAverage from "@/utils/calculateReviewRatingAverage";
import { Review } from "@prisma/client";
import React from "react";

const Rating = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div className="flex items-end">
      <div className="flex items-center mt-2 ratings">
        <Stars reviews={reviews} />
        <p className="ml-3 text-reg">
          {CalculateReviewRatingAverage(reviews).toFixed(1)}
        </p>
      </div>
      <div>
        <p className="ml-4 text-reg">
          {reviews.length} Review{reviews.length === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
};

export default Rating;
