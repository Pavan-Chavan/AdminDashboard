import { useState, useEffect } from "react";
import axios from "axios";
import { SketchPicker } from "react-color";
import { api } from "@/utils/apiProvider";
import { showAlert } from "@/utils/isTextMatched";
import Pagination from "../../common/Pagination";
import ActionsButton from "./ActionsButton";

// Utility function to convert ISO date to YYYY-MM-DD
const formatDateToYYYYMMDD = (isoDate) => {
  if (!isoDate) return "";
  return isoDate.split("T")[0]; // Extracts "2025-02-25" from "2025-02-25T18:30:00.000Z"
};

const CategoryTable = ({ searchParameter, refresh }) => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [categoryData, setCategoryData] = useState({
    category_id: null,
    category_name: "",
    slug: "",
    description: "",
    category_color_class: "#ffffff",
    seo_title: "",
    seo_description: "",
    keywords: "",
    og_url: "",
    canonical_url: "",
    featured_image: "",
    author: "",
    published_date: "",
    updated_date: "",
  });

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${api}/api/categories/get-categories`);
      if (response.data.success) {
        const formattedData = response.data.results.map(item => ({
          ...item,
          published_date: formatDateToYYYYMMDD(item.published_date),
          updated_date: formatDateToYYYYMMDD(item.updated_date),
        }));
        setCategories(formattedData);
        setFilteredCategories(formattedData);
      } else {
        setError("Failed to fetch categories.");
      }
    } catch (err) {
      setError("An error occurred while fetching categories.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [refresh]);

  // Handle Search
  useEffect(() => {
    const lowercasedTerm = searchParameter.toLowerCase();
    const filtered = categories.filter((category) =>
      category.category_name.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredCategories(filtered);
  }, [searchParameter]);

  // Edit category
  const handleEdit = (category) => {
    setCategoryData({
      category_id: category.category_id,
      category_name: category.category_name,
      slug: category.slug,
      description: category.description,
      category_color_class: category.category_color_class || "#ffffff",
      seo_title: category.seo_title || "",
      seo_description: category.seo_description || "",
      keywords: category.keywords || "",
      og_url: category.og_url || "",
      canonical_url: category.canonical_url || "",
      featured_image: category.featured_image || "",
      author: category.author || "",
      published_date: formatDateToYYYYMMDD(category.published_date),
      updated_date: formatDateToYYYYMMDD(category.updated_date),
    });
    setEditMode(true);
    setShowModal(true);
  };

  // Update category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${api}/api/categories/update-categories/${categoryData.category_id}`,
        categoryData
      );
      showAlert("Category updated successfully.", "success");
      setShowModal(false);
      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
      showAlert(error.response?.data?.error || "An error occurred.", "error");
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/api/categories/delete-categories/${id}`);
      showAlert("Category deleted successfully.", "success");
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      showAlert(error.response?.data?.error || "An error occurred.", "error");
    }
  };

  return (
    <>
      <div className="tabs -underline-2 js-tabs">
        <div className="tabs__content pt-30 js-tabs-content">
          <div className="tabs__pane -tab-item-1 is-tab-el-active">
            {loading ? (
              <p>Loading categories...</p>
            ) : error ? (
              <p className="text-red-1">{error}</p>
            ) : filteredCategories.length === 0 ? (
              <p>No categories available.</p>
            ) : (
              <div className="overflow-scroll scroll-bar-1">
                <table className="table-3 -border-bottom col-12">
                  <thead className="bg-light-2">
                    <tr>
                      <th>Category Name</th>
                      <th>Description</th>
                      <th>Slug</th>
                      <th>Count</th>
                      <th>Badge Color</th>
                      <th>SEO Title</th>
                      <th>Keywords</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCategories.map((category, index) => (
                      <tr key={index}>
                        <td>{category.category_name || "N/A"}</td>
                        <td>{category.description || "--"}</td>
                        <td>{category.slug || "N/A"}</td>
                        <td>{category.category_count || "0"}</td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div
                              style={{
                                width: "20px",
                                height: "20px",
                                backgroundColor: category.category_color_class || "#ccc",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                              }}
                            ></div>
                            <span>{category.category_color_class || "N/A"}</span>
                          </div>
                        </td>
                        <td>{category.seo_title || "N/A"}</td>
                        <td>{category.keywords || "N/A"}</td>
                        <td>
                          <ActionsButton
                            category={category}
                            onEdit={() => handleEdit(category)}
                            onDelete={() => handleDelete(category.category_id)}
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
      </div>

      {/* Edit Category Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{height:"90%", overflow:"scroll"}}>
            <h3>{editMode ? "Edit Post Category" : "Add Category"}</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Category Name:
                <input
                  type="text"
                  value={categoryData.category_name}
                  onChange={(e) =>
                    setCategoryData({ ...categoryData, category_name: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Category Slug:
                <input
                  type="text"
                  value={categoryData.slug}
                  onChange={(e) =>
                    setCategoryData({ ...categoryData, slug: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Description:
                <input
                  type="text"
                  value={categoryData.description}
                  onChange={(e) =>
                    setCategoryData({ ...categoryData, description: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Category Badge Color:
                <SketchPicker
                  color={categoryData.category_color_class}
                  onChangeComplete={(color) =>
                    setCategoryData({ ...categoryData, category_color_class: color.hex })
                  }
                />
              </label>
              <label>
                SEO Title:
                <input
                  type="text"
                  value={categoryData.seo_title}
                  onChange={(e) =>
                    setCategoryData({ ...categoryData, seo_title: e.target.value })
                  }
                />
              </label>
              <label>
                SEO Description:
                <textarea
                  value={categoryData.seo_description}
                  onChange={(e) =>
                    setCategoryData({ ...categoryData, seo_description: e.target.value })
                  }
                />
              </label>
              <label>
                Keywords:
                <input
                  type="text"
                  value={categoryData.keywords}
                  onChange={(e) =>
                    setCategoryData({ ...categoryData, keywords: e.target.value })
                  }
                />
              </label>
              <label>
                Open Graph URL:
                <input
                  type="url"
                  value={categoryData.og_url}
                  onChange={(e) =>
                    setCategoryData({ ...categoryData, og_url: e.target.value })
                  }
                />
              </label>
              <label>
                Canonical URL:
                <input
                  type="url"
                  value={categoryData.canonical_url}
                  onChange={(e) =>
                    setCategoryData({ ...categoryData, canonical_url: e.target.value })
                  }
                />
              </label>
              <label>
                Featured Image URL:
                <input
                  type="url"
                  value={categoryData.featured_image}
                  onChange={(e) =>
                    setCategoryData({ ...categoryData, featured_image: e.target.value })
                  }
                />
              </label>
              <label>
                Author:
                <input
                  type="text"
                  value={categoryData.author}
                  onChange={(e) =>
                    setCategoryData({ ...categoryData, author: e.target.value })
                  }
                />
              </label>
              <label>
                Published Date:
                <input
                  type="date"
                  value={categoryData.published_date}
                  onChange={(e) =>
                    setCategoryData({ ...categoryData, published_date: e.target.value })
                  }
                />
              </label>
              <label>
                Updated Date:
                <input
                  type="date"
                  value={categoryData.updated_date}
                  onChange={(e) =>
                    setCategoryData({ ...categoryData, updated_date: e.target.value })
                  }
                />
              </label>
              <div className="modal-actions">
                <button type="submit" className="button bg-blue-1 text-white">
                  Submit
                </button>
                <button
                  type="button"
                  className="button bg-light-2 text-dark-1"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryTable;