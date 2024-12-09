import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import products from "../utils/products.json";
import { ProductType } from "../utils/data";
import Products from "./Products";

const Categories = () => {
  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.category?.toLowerCase() === categoryName?.toLowerCase()
    );
    console.log(filtered);
    setFilteredProducts(filtered);
  }, [categoryName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <section className="section__container bg-primary">
        <h2 className="blog__header capitalize">{categoryName}</h2>
        <p className="blog__subheader">
          Browse a diverse range of categories, from grocery to electronics
          accessories. Elevate your life today!
        </p>
      </section>

      <Products products={filteredProducts} isCategoryPage={true} isSearchPage={false} />
    </>
  );
};

export default Categories;
