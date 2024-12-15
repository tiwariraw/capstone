import { Link, useParams } from "react-router-dom";
import Ratings from "../components/Ratings";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../rtk/cartSlice";
import { ProductType } from "../utils/data";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../services/api";
import { RootState } from "../rtk/store";

const SingleShopProductPage = () => {
  const [product, setProduct] = useState<ProductType | undefined>();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const getProduct = async () => {
    const res = await api.getProduct(id as string);
    setProduct(res);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleAddToCart = async () => {
    if (product) {
      if (user && user.id) {
        console.log("user", user);
        console.log("product", product);
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
    <>
      <section className="section__container bg-primary">
        <h2 className="blog__header capitalize">Shop Page</h2>
        <div className="section__subheader space-x-2">
          <span className="hover:text-white">
            <Link to="/">home</Link>
          </span>
          <i className="ri-arrow-right-wide-line"></i>
          <span className="hover:text-white">
            <Link to="/shop">shop</Link>
          </span>
          <i className="ri-arrow-right-wide-line"></i>
          <span className="hover:text-white cursor-pointer">
            {product?.name}
          </span>
        </div>
      </section>

      <section className="section__container mt-8">
        <div className="flex flex-col items-start md:flex-row gap-8">
          <div className="md:w-96 w-full">
            <img
              src={product?.image}
              alt="product image"
              className="rounded-md w-full h-96"
            />
          </div>

          <div className="md:w-1/2 w-full mt-12 ml-8">
            <h3 className="text-2xl font-semibold mb-4">{product?.name}</h3>
            <p className="text-xl text-primary mb-4">
              ${product?.oldPrice} <s>${product?.oldPrice}</s>
            </p>
            <p className="text-gray-500 mb-4">{product?.description}</p>

            {/* additional info about the product` */}
            <div>
              <p>
                <strong>Category:</strong> {product?.category}
              </p>
              <p className="my-2">
                <strong>Color:</strong> {product?.color}
              </p>
              <div className="flex gap-1 items-center">
                <strong>Ratings: </strong>
                <Ratings rating={product?.rating ?? 0} />
              </div>
            </div>

            {/* add to cart button */}
            <button
              onClick={handleAddToCart}
              className="mt-6 px-6 py-3 bg-primary-dark text-white rounded-md"
            >
              Add to cart
            </button>
          </div>
        </div>
      </section>

      {/* display reviews */}
      <section className="section__container">Reviews Here</section>
    </>
  );
};

export default SingleShopProductPage;
