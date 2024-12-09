import { FC } from "react";
import { Link } from "react-router-dom";
import Ratings from "../components/Ratings";

type ProductCardProps = {
  product: {
    id: number;
    name: string;
    category: string;
    description: string;
    price: number;
    oldPrice: number;
    image: string;
    color: string;
    rating: number;
  };
}; 

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <div key={product.id} className="product__card">
      <div className="relative">
        <Link to={`/shop/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300"
          />
        </Link>

        <div className="hover:block absolute top-3 right-3">
          <button>
            <i className="ri-shopping-cart-2-line bg-primary p-1.5 text-white hover:bg-primary-dark"></i>
          </button>
        </div>
      </div>

      {/* product description */}
      <div className="product__card__content">
        <h4>{product.name}</h4>
        <p>
          {product.price} {product.oldPrice ? <s>${product.oldPrice}</s> : null}
        </p>
        <Ratings rating={product.rating} />
      </div>
    </div>
  );
};

export default ProductCard;
