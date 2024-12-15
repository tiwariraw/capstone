import { useEffect, useState } from "react";
import { api } from "../services/api";
import Products from "./Products";
import { ProductType } from "../utils/data";

const TrendingProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.getProducts();
      setProducts(response!);
      setError("");
    } catch {
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader mb-12">
        Discover the hottest picks of 2024, from cutting-edge smartwatches and
        high-performance headphones to stylish women's casuals that redefine
        comfort.
      </p>

      {loading && <p>Loading products...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <Products
          products={products}
          isCategoryPage={false}
          isSearchPage={false}
        />
      )}
    </section>
  );
};

export default TrendingProducts;
