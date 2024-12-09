export const filters = {
  categories: ["all", "grocery", "fashion", "electronics", "toys", "beauty"],
  colors: ["all", "black", "red", "gold", "blue", "silver", "beige", "green"],
  priceRanges: [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 and above", min: 200, max: Infinity },
  ],
};

export type ProductType = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  oldPrice: number;
  image: string;
  color: string;
  rating: number;
  author?: string;
};

export type PriceRangeType = {
  label: string;
  min: number;
  max: number;
};

export type FiltersType = {
  categories: string[];
  colors: string[];
  priceRanges: PriceRangeType[];
};
