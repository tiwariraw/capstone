import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Login from "../pages/Login";
import axios from "axios";
import { toast } from "react-hot-toast";

// Mock axios and react-hot-toast
jest.mock("axios");
jest.mock("react-hot-toast", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock sessionStorage
beforeAll(() => {
  global.sessionStorage.setItem = jest.fn();
});

const mockStore = configureStore([]);
const store = mockStore({});

const renderComponent = () =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

describe("Login Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form", () => {
    renderComponent();

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Please Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account\?/i)).toBeInTheDocument();
  });

  test("displays error message for invalid credentials", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "wrongpassword" },
    });

    const signInButton = screen.getByRole("button", { name: /SignIn/i });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });

  test("displays an error when the API call fails", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText(/SignIn/i));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Something went wrong. Please try again."
      );
    });
  });
});
