import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "../../rtk/authslice";

const navItems = [
  { path: "/dashboard/admin", label: "Dashboard" },
  { path: "/dashboard/add-new-product", label: "Add new product" },
  { path: "/dashboard/manage-products", label: "Manage products" },
  { path: "/dashboard/users", label: "Users" },
  { path: "/dashboard/manage-orders", label: "Manage orders" },
];

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to logout");
      console.error("Failed to logout", error);
    }
  };

  return (
    <div className="space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between">
      <div>
        <div className="nav__logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <p className="text-xs italic">Admin Dashboard</p>
        </div>

        <hr className="mt-5" />

        <ul className="space-y-5 pt-5">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-primary-dark font-bold" : "text-black"
                }
                end
                to={item.path}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-3">
        <hr className="mb-3" />
        <button
          onClick={handleLogout}
          className="text-white bg-primary-dark font-medium px-5 py-1 rounded-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
