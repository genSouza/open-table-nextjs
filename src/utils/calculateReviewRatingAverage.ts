import { Review } from "@prisma/client";


const CalculateReviewRatingAverage = (reviews: Review[]) => {
  if(!reviews) return 0;

  if (reviews.length === 0) {
    return 0;
  }

  return (
    (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length)
  );
};

export default CalculateReviewRatingAverage;
