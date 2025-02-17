import { useState } from "react";
import "../../../../../../styles/modals.css";
import axios from "axios";
import { SketchPicker } from "react-color"; // Import SketchPicker from react-color
import { api } from "@/utils/apiProvider";
import { showAlert } from "@/utils/isTextMatched";

const AddTag = ({ refreshTags = () => {} }) => {
  const [showModal, setShowModal] = useState(false);
  const [tagData, settagData] = useState({
    tag_name: "",
    tag_color: "",
  });

  const [selectedColor, setSelectedColor] = useState("#007bff"); // Default color

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/api/tags/add-tags`, {
        ...tagData,
        tag_color: selectedColor, // Use the selected color
      });

      if (response.data.success === true) {
        showAlert("tag added successfully.", "success");
        settagData({
          tag_name: "",
          tag_color: "",
        });
        setSelectedColor("#007bff"); // Reset color picker
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

  return (
    <div className="col-auto">
      {/* Add tag Button */}
      <button
        className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
        onClick={() => setShowModal(true)}
      >
        Add tag <div className="icon-arrow-top-right ml-15"></div>
      </button>

      {/* Add tag Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add tag</h3>
            <form onSubmit={handleSubmit}>
              <label>
                tag Name:
                <input
                  type="text"
                  value={tagData.tag_name}
                  onChange={(e) =>
                    settagData({ ...tagData, tag_name: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Select tag Badge Color:
                <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                  {/* Color Picker */}
                  <SketchPicker
                    color={selectedColor}
                    onChangeComplete={(color) => setSelectedColor(color.hex)} // Update selected color
                  />
                </div>
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

export default AddTag;
