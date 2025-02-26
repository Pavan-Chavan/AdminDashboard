import { useState, useEffect } from "react";
import axios from "axios";
import { SketchPicker } from "react-color"; // Import SketchPicker from react-color
import { api } from "@/utils/apiProvider";
import { showAlert } from "@/utils/isTextMatched";
import Pagination from "../../common/Pagination";
import ActionsButton from "./ActionsButton";

const TagsTable = ({ searchParameter, refresh }) => {
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tagData, setTagData] = useState({
    tag_id: null,
    tag_name: "",
    tag_color: "#ffffff", // Default color
  });

  // Fetch tags
  const fetchtags = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await axios.get(`${api}/api/tags/get-all-tags`);
      if (response.status === 200) {
        setTags(response.data);
        setFilteredTags(response.data); // Set both main and filtered data
      } else {
        setError("Failed to fetch tags.");
      }
    } catch (err) {
      setError("An error occurred while fetching tags.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchtags();
  }, [refresh]);

  // Handle Search
  useEffect(() => {
    const lowercasedTerm = searchParameter.toLowerCase();
    const filtered = tags.filter((tag) =>
      tag.tag_name.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredTags(filtered);
  }, [searchParameter]);

  // Edit tag
  const handleEdit = (tag) => {
    setTagData({
      tag_id: tag.tag_id,
      tag_name: tag.tag_name,
      tag_color: tag.tag_color || "#ffffff", // Default to white if empty
    });
    setEditMode(true);
    setShowModal(true);
  };

  // Update tag
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${api}/api/tags/update-tags/${tagData.tag_id}`,
        tagData
      );
      showAlert("tag updated successfully.", "success");
      setShowModal(false);
      fetchtags(); // Refresh tags list
    } catch (error) {
      console.error("Error updating tag:", error);
      showAlert(error.response?.data?.error || "An error occurred.", "error");
    }
  };

  // Delete tag
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/api/tags/delete-tags/${id}`);
      showAlert("tag deleted successfully.", "success");
      fetchtags(); // Refresh tags list
    } catch (error) {
      console.error("Error deleting tag:", error);
      showAlert(error.response?.data?.error || "An error occurred.", "error");
    }
  };

  return (
    <>
      <div className="tabs -underline-2 js-tabs">
        <div className="tabs__content pt-30 js-tabs-content">
          <div className="tabs__pane -tab-item-1 is-tab-el-active">
            {loading ? (
              <p>Loading tags...</p>
            ) : error ? (
              <p className="text-red-1">{error}</p>
            ) : filteredTags.length === 0 ? (
              <p>No tags available.</p>
            ) : (
              <div className="overflow-scroll scroll-bar-1">
                <table className="table-3 -border-bottom col-12">
                  <thead className="bg-light-2">
                    <tr>
                      <th>Tag Name</th>
                      <th>Tag Image</th>
                      <th>Slug</th>
                      <th>Color</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTags.map((tag, index) => (
                      <tr key={index}>
                        <td>{tag.tag_name || "N/A"}</td>
                        <td>{tag.tag_img || "N/A"}</td>
                        <td>{tag.slug || "--"}</td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <div
                              style={{
                                width: "20px",
                                height: "20px",
                                backgroundColor:
                                  tag.tag_color || "#ccc",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                              }}
                            ></div>
                            <span>{tag.tag_color || "N/A"}</span>
                          </div>
                        </td>
                        <td>
                          <ActionsButton
                            tag={tag} // Passing the tag data
                            onEdit={() => handleEdit(tag)} // Handle Edit
                            onDelete={() => handleDelete(tag.tag_id)} // Handle Delete
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
      {/* Pagination can be added here */}

      {/* Edit tag Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editMode ? "Edit tag" : "Add tag"}</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Tag Name:
                <input
                  type="text"
                  value={tagData.tag_name}
                  onChange={(e) =>
                    setTagData({
                      ...tagData,
                      tag_name: e.target.value,
                    })
                  }
                  required
                />
              </label>
              <label>
              Tag Badge Color:
                <SketchPicker
                  color={tagData.tag_color_class}
                  onChangeComplete={(color) =>
                    setTagData({
                      ...tagData,
                      tag_color_class: color.hex,
                    })
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

export default TagsTable;
