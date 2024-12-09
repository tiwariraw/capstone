import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Deals from "../components/Deals";
import Hero from "../components/Hero";
import PromoBanner from "../components/PromoBanner";
import Blogs from "./Blogs";
import TrendingProducts from "./TrendingProducts";

const Home = () => {
  return (
    <>
      <Banner />
      <Categories />
      <Hero />
      <TrendingProducts />
      <Deals />
      <PromoBanner />
      <Blogs />
    </>
  );
};

export default Home;
