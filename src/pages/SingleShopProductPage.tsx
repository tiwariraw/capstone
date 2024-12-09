import { Link, useParams } from "react-router-dom";
import Ratings from "../components/Ratings";

const SingleShopProductPage = () => {
  const { id } = useParams();

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
          <span className="hover:text-white">product name</span>
        </div>
      </section>

      <section className="section__container mt-8">
        <div className="flex flex-col items-start md:flex-row gap-8">
          <div className="md:w-96 w-full">
            <img
              src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/18762622/2023/10/13/e67de1ce-cc38-449c-accf-fdc69186c8831697199664984ThesouledstoreBatmanTheBatSigilBlackOversizedT-Shirts5.jpg"
              alt="product image"
              className="rounded-md w-full h-96"
            />
          </div>

          <div className="md:w-1/2 w-full mt-12 ml-8">
            <h3 className="text-2xl font-semibold mb-4">Product Name</h3>
            <p className="text-xl text-primary mb-4">
              $100 <s>$130</s>
            </p>
            <p className="text-gray-500 mb-4">This is a product description</p>

            {/* additional info about the product` */}
            <div>
              <p>
                <strong>Category:</strong> grocery
              </p>
              <p className="my-2">
                <strong>Color:</strong> red
              </p>
              <div className="flex gap-1 items-center">
                <strong>Ratings: </strong>
                <Ratings rating={4} />
              </div>
            </div>

            {/* add to cart button */}
            <button className="mt-6 px-6 py-3 bg-primary-dark text-white rounded-md">
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
