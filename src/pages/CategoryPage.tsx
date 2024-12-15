import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { ProductType } from "../utils/data";
import Products from "./Products";

const Categories = () => {
  const { categoryName } = useParams();
  const [pdts, setPdts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  const getProducts = async () => {
    const res = await api.getProducts();
    setPdts(res);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const filtered = pdts.filter(
      (product) =>
        product.category?.toLowerCase() === categoryName?.toLowerCase()
    );
    console.log(filtered);
    setFilteredProducts(filtered);
  }, [categoryName, pdts]);

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

      <Products
        products={filteredProducts}
        isCategoryPage={true}
        isSearchPage={false}
      />
    </>
  );
};

export default Categories;
