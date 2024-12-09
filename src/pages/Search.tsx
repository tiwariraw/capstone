import { useEffect, useState } from "react";
import products from "../utils/products.json";
import { ProductType } from "../utils/data";
import Products from "./Products";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();

    const filtered = products?.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  return (
    <>
      <section className="section__container bg-primary">
        <h2 className="blog__header capitalize">Search Products</h2>
        <p className="blog__subheader">
          Saerch from a diverse collection of products, from grocery to
          electronics accessories. Elevate your life today!
        </p>
      </section>

      <section className="section__container">
        <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar w-full max-w-4xl p-2 border rounded"
          />

          <button
            onClick={handleSearch}
            className="search-btn w-full md:w-auto py-2 px-8 bg-primary-dark text-white rounded"
          >
            Search
          </button>
        </div>
      </section>

      <Products
        products={filteredProducts}
        isCategoryPage={false}
        isSearchPage={true}
      />
    </>
  );
};

export default Search;
