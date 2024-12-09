import category1 from "../assets/category1.webp";
import category2 from "../assets/category2.webp";
import category3 from "../assets/category3.webp";
import category4 from "../assets/category4.webp";
import category5 from "../assets/category5.webp";

export type Category = {
  name: string;
  path: string;
  image: string;
};

export const categories: Category[] = [
  { name: "Grocery", path: "grocery", image: category1 },
  { name: "Fashion", path: "fashion", image: category2 },
  { name: "Electronics", path: "electronics", image: category3 },
  { name: "Toys", path: "toys", image: category4 },
  { name: "Beauty", path: "beauty", image: category5 },
];
 