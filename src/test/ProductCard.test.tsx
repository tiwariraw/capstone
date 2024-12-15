import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore, { MockStore } from "redux-mock-store"; // Import MockStore
import ProductCard from "../components/ProductCard";
import { addToCart } from "../rtk/cartSlice";
import { toast } from "react-hot-toast";

jest.mock("react-hot-toast");

const mockStore = configureStore([]);

describe("ProductCard Component", () => {
  const mockProduct = {
    id: "1",
    name: "Sample Product",
    category: "Category",
    description: "Sample product description",
    price: 50,
    oldPrice: 70,
    image: "https://via.placeholder.com/150",
    color: "blue",
    rating: 4.5,
  };

  let store: MockStore;

  beforeEach(() => {
    store = mockStore({
      cart: { items: [] },
    });

    store.dispatch = jest.fn();
  });

  test("renders product details correctly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={mockProduct} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.name)).toBeInTheDocument();
  });

  test("renders old price when available", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={mockProduct} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(`$${mockProduct.oldPrice}`)).toBeInTheDocument();
  });

  test("adds product to cart on button click", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={mockProduct} />
        </BrowserRouter>
      </Provider>
    );

    const addToCartButton = screen.getByRole("button");
    fireEvent.click(addToCartButton);

    expect(store.dispatch).toHaveBeenCalledWith(addToCart(mockProduct));
    expect(toast.success).toHaveBeenCalledWith("Items added to the cart");
  });

  test("navigates to product details on image click", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={mockProduct} />
        </BrowserRouter>
      </Provider>
    );

    const productImage = screen.getByAltText(mockProduct.name);
    expect(productImage.closest("a")).toHaveAttribute(
      "href",
      `/shop/${mockProduct.id}`
    );
  });
});
