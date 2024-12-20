import { useEffect, useState } from "react";
import { filters } from "../utils/data";
import { api } from "../services/api";
import { ProductType } from "../utils/data";
import Products from "./Products";
import ShopFiltering from "./ShopFiltering";

const ShopPage = () => {
  const [pdts, setPdts] = useState<ProductType[]>([]);
  const [filteredPdts, setFilteredPdts] = useState<ProductType[]>([]);
  const [filtersState, setFiltersState] = useState({
    category: "all",
    color: "all",
    priceRange: "",
  });

  const getProducts = async () => {
    const res = await api.getProducts();
    setPdts(res!);
    setFilteredPdts(res!);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const applyFilters = () => {
    let filteredPdts = pdts;

    // filter by category
    if (filtersState.category && filtersState.category !== "all") {
      filteredPdts = filteredPdts.filter(
        (pdt) =>
          pdt.category.toLowerCase() === filtersState.category.toLowerCase()
      );
    }

    // filter by colors
    if (filtersState.color && filtersState.color !== "all") {
      filteredPdts = filteredPdts.filter(
        (pdt) => pdt.color.toLowerCase() === filtersState.color.toLowerCase()
      );
    }

    // filter by price range
    if (filtersState.priceRange) {
      const [min, max] = filtersState.priceRange.split("-").map(Number);
      filteredPdts = filteredPdts.filter(
        (pdt) => pdt.price >= min && pdt.price <= max
      );
    }

    setFilteredPdts(filteredPdts);
  };

  useEffect(() => {
    applyFilters();
  }, [filtersState]);

  // clear the filters
  const clearFilters = () => {
    setFiltersState({
      category: "all",
      color: "all",
      priceRange: "",
    });
  };

  return (
    <>
      <section className="section__container bg-primary">
        <h2 className="blog__header capitalize">Shop Page</h2>
        <p className="blog__subheader">
          Discover the coolest picks/ Elevate your lilfe with out curated
          collection of trending products
        </p>
      </section>

      <section className="section__containe">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          {/* left */}
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />

          {/* right side */}
          <div>
            <h3 className="text-xl font-medium my-4 mb-12">
              Products Available: {filteredPdts.length}
            </h3>
            <Products
              products={filteredPdts}
              isCategoryPage={false}
              isSearchPage={false}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
