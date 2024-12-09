import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import CategoryPage from "../pages/CategoryPage";
import Search from "../pages/Search";
// import ShopPage from "../pages/ShopPage";
import SingleShopProductPage from "../pages/SingleShopProductPage";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Loader from "../components/Loader";

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
]);
