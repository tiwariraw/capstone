import { FC } from "react";

type RatingProps = {
  rating: number;
};

const Ratings: FC<RatingProps> = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      // Fully filled stars
      stars.push(<span key={i} className="ri-star-fill"></span>);
    } else if (i < rating) {
      // Partially filled stars
      stars.push(<span key={i} className="ri-star-half-s-fill"></span>);
    } else {
      // Empty stars
      stars.push(<span key={i} className="ri-star-line"></span>);
    }
  }

  return <div className="product__rating">{stars}</div>;
};

export default Ratings;
