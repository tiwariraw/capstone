import instaImg1 from "../assets/instagram-1.jpg";
import instaImg2 from "../assets/instagram-2.jpg";
import instaImg3 from "../assets/instagram-3.jpg";
import instaImg4 from "../assets/instagram-4.jpg";
import instaImg5 from "../assets/instagram-5.jpg";
import instaImg6 from "../assets/instagram-6.jpg";

const Footer = () => {
  return (
    <>
      <footer className="section__container footer__container">
        <div className="footer__col">
          <h4>Contact Info</h4>
          <p>
            <span>
              <i className="ri-map-pin-2-fill"></i>
            </span>
            8081, Whitefield, Bangalore, 560066, India
          </p>
          <p>
            <span>
              <i className="ri-mail-fill"></i>
            </span>
            support@shopfushion.com
          </p>
          <p>
            <span>
              <i className="ri-phone-fill"></i>
            </span>
            +91-9513669893
          </p>
        </div>

        <div className="footer_col">
          <h4>Company</h4>
          <a href="/" className="block hover:text-primary-dark mb-2 underline">
            Home
          </a>
          <a href="/" className="block hover:text-primary-dark mb-2 underline">
            About us
          </a>
          <a href="/" className="block hover:text-primary-dark mb-2 underline">
            Work with us
          </a>
          <a href="/" className="block hover:text-primary-dark mb-2 underline">
            Our Blogs
          </a>
          <a href="/" className="block hover:text-primary-dark mb-2 underline">
            Terms & conditions
          </a>
        </div>

        <div className="footer_col">
          <h4>Useful links</h4>
          <a href="/" className="block hover:text-primary-dark mb-2 underline">
            Help
          </a>
          <a href="/" className="block hover:text-primary-dark mb-2 underline">
            Track your order
          </a>
          <a href="/" className="block hover:text-primary-dark mb-2 underline">
            Electronics
          </a>
          <a href="/" className="block hover:text-primary-dark mb-2 underline">
            Grocery
          </a>
          <a href="/" className="block hover:text-primary-dark mb-2 underline">
            Accessories
          </a>
        </div>

        <div className="footer_col">
          <h4>Instagram</h4>
          <div className="instagram__grid">
            <img src={instaImg1} alt="instagram image 1" />
            <img src={instaImg2} alt="instagram image 2" />
            <img src={instaImg3} alt="instagram image 3" />
            <img src={instaImg4} alt="instagram image 4" />
            <img src={instaImg5} alt="instagram image 5" />
            <img src={instaImg6} alt="instagram image 6" />
          </div>
        </div>
      </footer>

      <div className="footer__bar">
        Copyright &#169; 2025 Ashish Tiwari. All rights reserved.
      </div>
    </>
  );
};

export default Footer;
