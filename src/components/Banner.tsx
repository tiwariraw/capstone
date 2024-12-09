import { Link } from "react-router-dom";
import bannerImg from "../assets/header.png";

const Banner = () => {
  return (
    <div className="section__container header__container">
      <div className="header__content z-30">
        <h4>Up to 30% discount on</h4>
        <h1>Electronics Items</h1>
        <p>
          Get ready to upgrade your tech game with exclusive discounts on
          electronics that you simply can’t miss! Laptops are now available at
          up to 50% off, making it the perfect time to enhance your productivity
          or gaming experience. Smartphones start at just Rs. 10000.
        </p>
        <button className="btn">
          <Link to="/shop">EXPLORE NOW</Link>
        </button>
      </div>

      <div className="header__image">
        <img src={bannerImg} alt="banner" />
      </div>
    </div>
  );
};

export default Banner;
