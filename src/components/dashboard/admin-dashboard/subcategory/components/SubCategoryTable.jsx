import { useState, useEffect } from "react";
import axios from "axios";
import { SketchPicker } from "react-color";
import { api } from "@/utils/apiProvider";
import { showAlert } from "@/utils/isTextMatched";
import Pagination from "../../common/Pagination";
import ActionsButton from "./ActionsButton";
import { isEmpty } from "lodash";

// Utility function to convert ISO date to YYYY-MM-DD
const formatDateToYYYYMMDD = (isoDate) => {
  if (!isoDate) return "";
  return isoDate.split("T")[0]; // Extracts "2025-02-25" from "2025-02-25T18:30:00.000Z"
};

const SubCategoryTable = ({ searchParameter, refresh }) => {
  const [subCategory, setSubCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredSubCategory, setFilteredSubCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState({
    sub_category_id: null,
    sub_category_name: "",
    parent_category_name: "",
    slug: "",
    category_color: "#ffffff",
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

  const fetchSubCategory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${api}/api/sub-categories/get-all-sub-categories`);
      if (response.status === 200) {
        const formattedData = response.data.map(item => ({
          ...item,
          published_date: formatDateToYYYYMMDD(item.published_date),
          updated_date: formatDateToYYYYMMDD(item.updated_date),
        }));
        setSubCategory(formattedData);
        setFilteredSubCategory(formattedData);
      } else {
        setError("Failed to fetch subcategories.");
      }
    } catch (err) {
      setError("An error occurred while fetching subcategories.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${api}/api/categories/get-categories`);
      if (response.data.success) {
        setCategories(response.data.results);
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
    fetchSubCategory();
    fetchCategories();
  }, [refresh]);

  useEffect(() => {
    const lowercasedTerm = searchParameter.toLowerCase();
    const filtered = subCategory.filter((tag) =>
      tag.sub_category_name.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredSubCategory(filtered);
  }, [searchParameter]);

  const handleEdit = (subcategory) => {
    setSubCategoryData({
      sub_category_id: subcategory.sub_category_id,
      sub_category_name: subcategory.sub_category_name,
      parent_category_name: subcategory.parent_category_name,
      slug: subcategory.slug,
      category_color: subcategory.category_color || "#ffffff",
      seo_title: subcategory.seo_title || "",
      seo_description: subcategory.seo_description || "",
      keywords: subcategory.keywords || "",
      og_url: subcategory.og_url || "",
      canonical_url: subcategory.canonical_url || "",
      featured_image: subcategory.featured_image || "",
      author: subcategory.author || "",
      published_date: formatDateToYYYYMMDD(subcategory.published_date),
      updated_date: formatDateToYYYYMMDD(subcategory.updated_date),
    });
    setEditMode(true);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${api}/api/sub-categories/edit-sub-categories/${subCategoryData.sub_category_id}`,
        subCategoryData
      );
      showAlert("Subcategory updated successfully.", "success");
      setShowModal(false);
      fetchSubCategory();
    } catch (error) {
      console.error("Error updating subcategory:", error);
      showAlert(error.response?.data?.error || "An error occurred.", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/api/sub-categories/delete-sub-categories/${id}`);
      showAlert("Subcategory deleted successfully.", "success");
      fetchSubCategory();
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      showAlert(error.response?.data?.error || "An error occurred.", "error");
    }
  };

  return (
    <>
      <div className="tabs -underline-2 js-tabs">
        <div className="tabs__content pt-30 js-tabs-content">
          <div className="tabs__pane -tab-item-1 is-tab-el-active">
            {loading ? (
              <p>Loading subcategories...</p>
            ) : error ? (
              <p className="text-red-1">{error}</p>
            ) : filteredSubCategory.length === 0 ? (
              <p>No subcategories available.</p>
            ) : (
              <div className="overflow-scroll scroll-bar-1">
                <table className="table-3 -border-bottom col-12">
                  <thead className="bg-light-2">
                    <tr>
                      <th>Sub Category Name</th>
                      <th>Parent Category</th>
                      <th>Slug</th>
                      <th>Color</th>
                      <th>SEO Title</th>
                      <th>Keywords</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubCategory.map((subCategory, index) => (
                      <tr key={index}>
                        <td>{subCategory.sub_category_name || "N/A"}</td>
                        <td>{subCategory.parent_category_name || "N/A"}</td>
                        <td>{subCategory.slug || "--"}</td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div
                              style={{
                                width: "20px",
                                height: "20px",
                                backgroundColor: subCategory.category_color || "#ccc",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                              }}
                            ></div>
                            <span>{subCategory.category_color || "N/A"}</span>
                          </div>
                        </td>
                        <td>{subCategory.seo_title || "N/A"}</td>
                        <td>{subCategory.keywords || "N/A"}</td>
                        <td>
                          <ActionsButton
                            tag={subCategory}
                            onEdit={() => handleEdit(subCategory)}
                            onDelete={() => handleDelete(subCategory.sub_category_id)}
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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{height:"90%", overflow:"scroll"}}>
            <h3>{editMode ? "Edit Subcategory" : "Add Subcategory"}</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Sub Category Name:
                <input
                  type="text"
                  value={subCategoryData.sub_category_name}
                  onChange={(e) =>
                    setSubCategoryData({ ...subCategoryData, sub_category_name: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Slug:
                <input
                  type="text"
                  value={subCategoryData.slug}
                  onChange={(e) =>
                    setSubCategoryData({ ...subCategoryData, slug: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                <div className="dropdown js-dropdown js-services-active w-100">
                  <div
                    className="dropdown__button d-flex items-center justify-between bg-white rounded-4 w-100 text-14 px-20 h-50 text-14"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="true"
                    aria-expanded="false"
                    data-bs-offset="0,10"
                  >
                    <span className="d-flex js-dropdown-title">
                      {isEmpty(subCategoryData.parent_category_name)
                        ? "Select Parent Category"
                        : subCategoryData.parent_category_name}
                    </span>
                    <i className="icon icon-chevron-sm-down text-7 ml-10" />
                  </div>
                  <div className="toggle-element -dropdown w-100 dropdown-menu">
                    <div className="text-14 y-gap-15 js-dropdown-list">
                      {categories.map((category, index) => (
                        <div
                          key={index}
                          id={category.category_id}
                          className={`js-dropdown-link`}
                          style={{ flex: "0 0 130px", borderRadius: "0 15px 15px 0" }}
                          onClick={() =>
                            setSubCategoryData({
                              ...subCategoryData,
                              parent_category_name: category.category_name,
                            })
                          }
                        >
                          {category.category_name}{" "}
                          {category.category_name === subCategoryData.parent_category_name ? "*" : ""}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </label>
              <label>
                Sub Category Badge Color:
                <SketchPicker
                  color={subCategoryData.category_color}
                  onChangeComplete={(color) =>
                    setSubCategoryData({ ...subCategoryData, category_color: color.hex })
                  }
                />
              </label>
              <label>
                SEO Title:
                <input
                  type="text"
                  value={subCategoryData.seo_title}
                  onChange={(e) =>
                    setSubCategoryData({ ...subCategoryData, seo_title: e.target.value })
                  }
                />
              </label>
              <label>
                SEO Description:
                <textarea
                  value={subCategoryData.seo_description}
                  onChange={(e) =>
                    setSubCategoryData({ ...subCategoryData, seo_description: e.target.value })
                  }
                />
              </label>
              <label>
                Keywords:
                <input
                  type="text"
                  value={subCategoryData.keywords}
                  onChange={(e) =>
                    setSubCategoryData({ ...subCategoryData, keywords: e.target.value })
                  }
                />
              </label>
              <label>
                Open Graph URL:
                <input
                  type="url"
                  value={subCategoryData.og_url}
                  onChange={(e) =>
                    setSubCategoryData({ ...subCategoryData, og_url: e.target.value })
                  }
                />
              </label>
              <label>
                Canonical URL:
                <input
                  type="url"
                  value={subCategoryData.canonical_url}
                  onChange={(e) =>
                    setSubCategoryData({ ...subCategoryData, canonical_url: e.target.value })
                  }
                />
              </label>
              <label>
                Featured Image URL:
                <input
                  type="url"
                  value={subCategoryData.featured_image}
                  onChange={(e) =>
                    setSubCategoryData({ ...subCategoryData, featured_image: e.target.value })
                  }
                />
              </label>
              <label>
                Author:
                <input
                  type="text"
                  value={subCategoryData.author}
                  onChange={(e) =>
                    setSubCategoryData({ ...subCategoryData, author: e.target.value })
                  }
                />
              </label>
              <label>
                Published Date:
                <input
                  type="date"
                  value={subCategoryData.published_date}
                  onChange={(e) =>
                    setSubCategoryData({ ...subCategoryData, published_date: e.target.value })
                  }
                />
              </label>
              <label>
                Updated Date:
                <input
                  type="date"
                  value={subCategoryData.updated_date}
                  onChange={(e) =>
                    setSubCategoryData({ ...subCategoryData, updated_date: e.target.value })
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

export default SubCategoryTable;