import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import blogsData from "../../data/blogs";

const Blog1 = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Load only the first 6 blogs
    setBlogs(blogsData.slice(0, 6));
  }, []);

  return (
    <>
      <div className="tabs -pills-3 pt-30">
        <div className="row y-gap-30 pt-30">
          {blogs.map((item) => (
            <div className="col-lg-4 col-sm-6" key={item.id}>
              <Link
                to={`/blog-details/${item.id}`}
                className="blogCard -type-1 d-block"
              >
                <div className="blogCard__image">
                  <div className="rounded-8">
                    <img
                      className="cover w-100 img-fluid"
                      src={item.img}
                      alt="image"
                    />
                  </div>
                </div>
                <div className="pt-20">
                  <h4 className="text-dark-1 text-18 fw-500">{item.title}</h4>
                  <div className="text-light-1 text-15 lh-14 mt-5">
                    {item.date}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {/* End .row */}
      </div>
    </>
  );
};

export default Blog1;
