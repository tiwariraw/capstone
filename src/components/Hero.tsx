import { cards } from "../utils/cards";
import HeroCard from "./HeroCard";

const Hero = () => {
  return (
    <section className="section__container hero__container">
      {cards?.map((card, i) => (
        <HeroCard card={card} key={i} />
      ))}
    </section>
  );
};

export default Hero;
