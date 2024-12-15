import { FC } from "react";
import { Link } from "react-router-dom";
import Ratings from "../components/Ratings";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../rtk/cartSlice";
import { api } from "../services/api";
import { toast } from "react-hot-toast";
import { RootState } from "../rtk/store";
import { ProductType } from "../utils/data";

type ProductCardProps = {
  product: {
    id: string;
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
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleAddToCart = async (product: ProductType) => {
    if (product) {
      if (user && user.id) {
        await api.addToUserCart(user.id, product);
        dispatch(addToCart(product));
        toast.success("Product added to cart successfully!");
      } else {
        toast.error("User is not logged in. Please log in to add to cart.");
      }
    } else {
      toast.error("Product is undefined, cannot add to cart.");
    }
  };

  return (
    <div key={product.id} className="product__card">
      <div className="relative">
        <Link to={`/shop/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300"
          />
        </Link>

        <div className="hover:block absolute top-3 right-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
          >
            <i className="ri-shopping-cart-2-line bg-primary p-1.5 text-white hover:bg-primary-dark"></i>
          </button>
        </div>
      </div>

      {/* product description */}
      <div className="product__card__content">
        <h4>{product.name}</h4>
        <p>
          ${product.price}{" "}
          {product.oldPrice ? <s>${product.oldPrice}</s> : null}
        </p>
        <Ratings rating={product.rating} />
      </div>
    </div>
  );
};

export default ProductCard;
