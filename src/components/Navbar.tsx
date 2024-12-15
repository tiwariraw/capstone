import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../rtk/store";
import { useState } from "react";
import toast from "react-hot-toast";
import CartModal from "./CartModal";
import { logout } from "../rtk/authslice";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const products = useSelector((state: RootState) => state.cart.products);

  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const handleDropDownToogle = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const handleCartToogle = () => {
    setIsCartOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      // what to do for logging a user out
      dispatch(logout());
      sessionStorage.clear();
      toast.success("Loged out successfully");
      navigate("/");
    } catch {
      console.log("An error occured while logging out");
    }
  };

  // admin dropdown menus
  const adminDropDownMenus = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Items", path: "/dashboard/manage-products" },
    { label: "All Orders", path: "/dashboard/manage-orders" },
    { label: "Add new post", path: "/dashboard/add-new-post" },
  ];

  // user dropdown menus
  const userDropDownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ];

  const dropDownMenus =
    user?.role === "admin" ? [...adminDropDownMenus] : [...userDropDownMenus];

  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        <ul className="nav__links">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="link">
            <Link to="/about">About</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        {/* nav icons */}
        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <i className="ri-search-line"></i>
            </Link>
          </span>

          <span>
            <button onClick={handleCartToogle} className="hover:text-blue-700">
              <i className="ri-shopping-bag-line"></i>
              <sup className="text-sm inline-block p-0.3 text-blue-700 rounded-full text-center">
                {products.length}
              </sup>
            </button>
          </span>

          <span>
            {user ? (
              <>
                <span onClick={handleDropDownToogle}>
                  <i
                    className={
                      user?.role === "user"
                        ? "ri-user-fill cursor-pointer text-primary-dark"
                        : "ri-user-fill cursor-pointer text-primary-admin"
                    }
                  ></i>
                </span>

                {isDropDownOpen && (
                  <div className="absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow z-50">
                    <ul className="font-medium space-y-4 p-2">
                      {dropDownMenus.map((menu, i) => (
                        <li key={i}>
                          <Link
                            onClick={() => setIsDropDownOpen(false)}
                            className="dropdown-items"
                            to={menu.path}
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogout}
                          className="dropdown-items hover:text-primary-dark"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <i className="ri-user-line"></i>
              </Link>
            )}
          </span>
        </div>
      </nav>

      {isCartOpen && (
        <CartModal
          products={products}
          isOpen={isCartOpen}
          onClose={handleCartToogle}
        />
      )}
    </header>
  );
};

export default Navbar;
