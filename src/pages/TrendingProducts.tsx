import products from "../utils/products.json";
import Products from "./Products";

const TrendingProducts = () => {

  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader mb-12">
        Discover the hottest picks of 2024, from cutting-edge smartwatches and
        high-performance headphones to stylish women's casuals that redefine
        comfort.
      </p>

      <Products products={products} />
    </section>
  );
};

export default TrendingProducts;
