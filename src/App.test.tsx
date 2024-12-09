import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

jest.mock("./components/Navbar", () => () => (
  <nav data-testid="navbar">Navbar</nav>
));

jest.mock("./components/Footer", () => () => (
  <footer data-testid="footer">Footer</footer>
));

describe("App Component", () => {
  test("renders Navbar, Outlet, and Footer", () => {
    render(<App />);

    // Is Navbar rendered
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByText("Navbar")).toBeInTheDocument();

    // Is Outlet rendered
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
    expect(screen.getByText("Outlet Content")).toBeInTheDocument();

    // Is Footer rendered
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  test("renders components in correct order", () => {
    render(<App />);

    const navbar = screen.getByTestId("navbar");
    const outlet = screen.getByTestId("outlet");
    const footer = screen.getByTestId("footer");

    // Check the layout order using DOM hierarchy
    expect(navbar.nextSibling).toBe(outlet);
    expect(outlet.nextSibling).toBe(footer);
  });
});
