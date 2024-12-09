import card1 from "../assets/card1.jpeg";
import card2 from "../assets/card2.jpeg";
import card3 from "../assets/card3.jpeg";

export type Card = {
  id: number;
  image: string;
  trend: string;
  title: string;
};

export const cards: Card[] = [
  { id: 1, image: card1, trend: "2024 Trend", title: "Headphones" },
  { id: 2, image: card2, trend: "2024 Trend", title: "Womens Casuals" },
  { id: 3, image: card3, trend: "2024 Trend", title: "Smart Watches" },
];
