import { Link } from "react-router-dom";
import { categories } from "../utils/categories";

const Categories = () => {
  return (
    <>
      <div className="product__grid">
        {categories?.map((category) => (
          <Link
            to={`/categories/${category.path}`}
            className="categories__card"
            key={category.name}
          >
            <img src={category.image} alt={category.name} />
            <h4>{category.name}</h4>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Categories;
