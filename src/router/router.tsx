import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import CategoryPage from "../pages/CategoryPage";
import Search from "../pages/Search";
import SingleShopProductPage from "../pages/SingleShopProductPage";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Loader from "../components/Loader";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import { UserDashboardMain } from "../pages/dashboard/user_dashboard/UserDashboardMain";
import UserOrders from "../pages/dashboard/user_dashboard/UserOrders";
import UserProfile from "../pages/dashboard/user_dashboard/UserProfile";

// lazy loading
const ShopPage = lazy(() => import("../pages/ShopPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/categories/:categoryName",
        element: <CategoryPage />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/shop",
        element: (
          <Suspense fallback={<Loader />}>
            <ShopPage />
          </Suspense>
        ),
      },
      {
        path: "/shop/:id",
        element: <SingleShopProductPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // user route
      {
        path: "",
        element: <UserDashboardMain />,
      },
      {
        path: "orders",
        element: <UserOrders />,
      },
      // Implement later
      // {
      //   path: "payments",
      //   element: <div>User Payments</div>,
      // },
      {
        path: "profile",
        element: <UserProfile />,
      },
      // Implement later
      // {
      //   path: "reviews",
      //   element: <div>User Reviews</div>,
      // },

      // admin routes (only accessible by admins) Todo: include private routes with role field
      {
        path: "admin",
        element: (
          <PrivateRoute role="admin">
            <div>Admin Dashboard</div>
          </PrivateRoute>
        ),
      },
      {
        path: "add-new-product",
        element: (
          <PrivateRoute role="admin">
            <div>New Product</div>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <PrivateRoute role="admin">
            <div>Manage Product</div>
          </PrivateRoute>
        ),
      },
      {
        path: "update-product/:id",
        element: (
          <PrivateRoute role="admin">
            <div>Update Product</div>
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateRoute role="admin">
            <div>All users</div>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <PrivateRoute role="admin">
            <div>Manage orders</div>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
