import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.tsx";
import { store } from "./rtk/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import "./index.css";
import "remixicon/fonts/remixicon.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </StrictMode>
);
