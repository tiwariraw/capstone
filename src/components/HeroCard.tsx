import { FC } from "react";
import { Card } from "../utils/cards";

type HeroCardProps = {
  card: Card;
};

const HeroCard: FC<HeroCardProps> = ({ card }) => {
  return (
    <div key={card.id} className="hero__card">
      <img src={card.image} alt={card.title} />
      <div className="hero__content">
        <p>{card.trend}</p>
        <h4>{card.title}</h4>
        <a href="#">
          Discover More <i className="ri-arrow-right-fill"></i>
        </a>
      </div>
    </div>
  );
};

export default HeroCard;
