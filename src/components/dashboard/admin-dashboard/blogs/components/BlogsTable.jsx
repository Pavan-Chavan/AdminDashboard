import { useState, useEffect } from "react";
import axios from "axios";
import ActionsButton from "./ActionsButton";
import { api } from "@/utils/apiProvider";
import { showAlert } from "@/utils/isTextMatched";
import { useNavigate } from "react-router-dom";
import { getId } from "@/utils/DOMUtils";
import "../../../../../styles/modals.css";
import Pagination from "@/components/hotel-list/common/Pagination";

const BlogsTable = ({ searchParameter="", refresh }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({ page: 1, limit: 2 }); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await axios.get(`${api}/api/blogpost/get-blogs`, {
        params : {
          ...searchParams,
          get_all : true,
          search : searchParameter
        }
      });
      if (response.status === 200) {
        setBlogs(response.data);
      } else {
        setError("Failed to fetch blogs.");
      }
    } catch (err) {
      setError("An error occurred while fetching blogs.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderCategory = (category) => {
    return category.map((category)=>{return category.category_name}).join(", ");
  }

  const renderSubCategory = (subCategory) => {
    return subCategory.map((subCategory)=>{return subCategory.sub_category_name}).join(", ")
  }

  useEffect(() => {
    fetchBlogs();
  }, [refresh]);
  // Handle Search
  useEffect(() => {
    fetchBlogs();    
  }, [searchParameter, searchParams]);

  const handleEdit = (blog) => {
    navigate("/admin-dashboard/blog-posts/edit",{state: blog});
  };

  const handleDelete = async (id) => {
      try {
        await axios.delete(`${api}/api/blogpost/delete-blog/${id}`);
        showAlert("blog deleted successfully.","success");
        fetchBlogs(); // Refresh venues list
      } catch (error) {
        console.error("Error deleting blog:", error);
        showAlert(error.response?.data?.error || "An error occurred.","error");
      }
  };

  return (
    <>
      <div className="tabs -underline-2 js-tabs">
        <div className="tabs__content pt-30 js-tabs-content">
          <div className="tabs__pane -tab-item-1 is-tab-el-active">
            {loading ? (
              <p>Loading blogs...</p>
            ) : error ? (
              <p className="text-red-1">{error}</p>
            ) : blogs.results.length === 0 ? (
              <p>No blogs available.</p>
            ) : (
              <div className="overflow-scroll scroll-bar-1">
                <table className="table-3 -border-bottom col-12">
                  <thead className="bg-light-2">
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Sub Category</th>
                      <th>Slug</th>
                      <th>Author</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.results.map((blog, index) => (
                      <tr key={index}>
                        <td>{blog.title}</td>
                        <td>{renderCategory(JSON.parse(blog.category))} </td>
                        <td>{renderSubCategory(JSON.parse(blog.sub_category)) || "N/A"}</td>
                        <td>{blog.slug || "N/A"}</td>
                        <td>{blog.author || "N/A"}</td>
                        <td
                          className={
                            blog.is_enable
                              ? "status-published"
                              : "status-draft"
                          }
                        >
                          {blog.is_enable ? "Published" : "Draft"}
                        </td>
                        <td>
                          <ActionsButton
                            blog={blog} // Passing the venue data
                            onEdit={() => handleEdit(blog)} // Handle Edit
                            onDelete={() => handleDelete(blog.id)} // Handle Delete
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <Pagination totalPages={blogs?.pagination?.totalPages} setSearchParams={setSearchParams}/>
      </div>
    </>
  );
};

export default BlogsTable;