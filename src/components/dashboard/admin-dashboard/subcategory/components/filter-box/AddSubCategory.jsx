import { api } from "@/utils/apiProvider";
import { showAlert } from "@/utils/isTextMatched";
import axios from "axios";
import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import "../../../../../../styles/modals.css";
import { isEmpty } from "lodash";

const AddSubCategory = ({ refreshTags = () => {} }) => {
  const [showModal, setShowModal] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState({
    sub_category_id: null,
    sub_category_name: "",
    slug: "",
    parent_category_name: "",
    category_color: "#ffffff", // Default color
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

  const [categories, setCategories] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/api/sub-categories/add-sub-categories`, subCategoryData);

      if (response.status === 201) {
        showAlert("Subcategory added successfully.", "success");
        setSubCategoryData({
          sub_category_id: null,
          sub_category_name: "",
          slug: "",
          parent_category_name: "",
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
        setShowModal(false);
        refreshTags(); // Refresh the tag list after adding
      } else {
        showAlert("Something went wrong.", "error");
      }
    } catch (error) {
      showAlert(error.response?.data?.error || "An error occurred.", "error");
      console.error("Error:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${api}/api/categories/get-categories`);
      if (response.data.success) {
        setCategories(response.data.results);
      } else {
        showAlert("Failed to fetch categories.");
      }
    } catch (err) {
      showAlert("An error occurred while fetching categories.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="col-auto">
      {/* Add Subcategory Button */}
      <button
        className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
        onClick={() => setShowModal(true)}
      >
        Add Sub Category <div className="icon-arrow-top-right ml-15"></div>
      </button>

      {/* Add Subcategory Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{height:"90%",overflow:"scroll"}}>
            <h3>Add Sub Category</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Sub Category Name:
                <input
                  type="text"
                  value={subCategoryData.sub_category_name}
                  onChange={(e) =>
                    setSubCategoryData({
                      ...subCategoryData,
                      sub_category_name: e.target.value,
                    })
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
                    setSubCategoryData({
                      ...subCategoryData,
                      slug: e.target.value,
                    })
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
                    setSubCategoryData({
                      ...subCategoryData,
                      category_color: color.hex,
                    })
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
    </div>
  );
};

export default AddSubCategory;