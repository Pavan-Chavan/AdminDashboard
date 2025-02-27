import { useState } from "react";
import "../../../../../../styles/modals.css";
import axios from "axios";
import { SketchPicker } from "react-color";
import { api } from "@/utils/apiProvider";
import { showAlert } from "@/utils/isTextMatched";

const AddCategory = ({ refreshCategories = () => {} }) => {
  const [showModal, setShowModal] = useState(false);
  const [categoryData, setCategoryData] = useState({
    category_name: "",
    slug: "",
    description: "",
    category_color_class: "#007bff", // Default color
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/api/categories/create-categories`, categoryData);

      if (response.data.success === true) {
        showAlert("Category added successfully.", "success");
        setCategoryData({
          category_name: "",
          slug: "",
          description: "",
          category_color_class: "#007bff", // Reset to default color
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
        refreshCategories();
      } else {
        showAlert("Something went wrong.", "error");
      }
    } catch (error) {
      showAlert(error.response?.data?.message || "An error occurred.", "error");
      console.error("Error:", error);
    }
  };

  return (
    <div className="col-auto">
      {/* Add Category Button */}
      <button
        className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
        onClick={() => setShowModal(true)}
      >
        Add Category <div className="icon-arrow-top-right ml-15"></div>
      </button>

      {/* Add Category Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{height:"90%", overflow:"scroll"}}>
            <h3>Add Post Category</h3>
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
                Select Category Badge Color:
                <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                  <SketchPicker
                    color={categoryData.category_color_class}
                    onChangeComplete={(color) =>
                      setCategoryData({ ...categoryData, category_color_class: color.hex })
                    }
                  />
                </div>
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
    </div>
  );
};

export default AddCategory;