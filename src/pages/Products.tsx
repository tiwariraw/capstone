import { FC, useState } from "react";
import ProductCard from "../components/ProductCard";
import { ProductType } from "../utils/data";

type ProductsProps = {
  products: ProductType[];
  isCategoryPage: boolean;
  isSearchPage: boolean;
};

const Products: FC<ProductsProps> = ({
  products,
  isCategoryPage,
  isSearchPage,
}) => {
  const [visibleProducts, setVisibleProducts] = useState(8);

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => prev + 4);
  };

  return (
    <>
      {/* products */}
      <div
        className={
          isCategoryPage
            ? "grid grid-cols-1 mt-12 ml-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            : isSearchPage
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ml-16"
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        }
      >
        {products?.slice(0, visibleProducts).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

      {/* load more products button */}
      <div className="product__btn">
        {visibleProducts < products.length && (
          <button className="load-more-btn" onClick={loadMoreProducts}>
            Load More
          </button>
        )}
      </div>
    </>
  );
};

export default Products;
