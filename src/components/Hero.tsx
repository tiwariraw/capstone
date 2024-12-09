import { cards } from "../utils/cards";
import HeroCard from "./HeroCard";

const Hero = () => {
  return (
    <section className="section__container hero__container">
      {cards?.map((card) => (
        <HeroCard card={card} />
      ))}
    </section>
  );
};

export default Hero;
