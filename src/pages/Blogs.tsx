import { useEffect, useState } from "react";
import { api } from "../services/api";
import { BlogType } from "../utils/data";

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogType[]>();

  const getBlogs = async () => {
    const res = await api.getBlogs();
    setBlogs(res);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <section className="section__container blog__container">
      <h2 className="blog__header">Latest from Blog</h2>
      <p className="blog__subheader">
        Elevate your electronic gadgets with our freshest cool tips, trends, and
        inspiration on our blog.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
        {blogs?.map((blog, i) => (
          <div
            key={i}
            className="blog__card cursor-pointer hover:scale-105 transition-all duration-0"
          >
            <img src={blog.imageUrl} alt="blog image" />
            <div className="blog__card__content">
              <h6>{blog.subtitle}</h6>
              <h4>{blog.title}</h4>
              <p>{blog.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
