import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
