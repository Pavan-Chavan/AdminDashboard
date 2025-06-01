import { useState, useEffect } from "react";
import axios from "axios";
import ActionsButton from "./ActionsButton";
import { api, krushiMahaDomain } from "@/utils/apiProvider";
import { showAlert } from "@/utils/isTextMatched";
import { useNavigate } from "react-router-dom";
import { getId } from "@/utils/DOMUtils";
import Pagination from "@/components/hotel-list/common/Pagination";
import { districts } from "../../../../../constant/weather/districts-data";
import { talukas } from "@/constant/weather/talukas-data";
import { statesArray } from "../../../../../constant/weather/states-data";

const BlogCommentTable = ({ searchParameter = "", refresh }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    state: "",
    district: "",
    taluka: "",
    address: "",
  });
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({ page: 1, limit: 30 });

  // Fetch comments
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${api}/api/admin/comments`, {
        params: {
          ...searchParams,
          search: searchParameter,
        },
      });
      if (response.status === 200) {
        setComments(response.data);
      } else {
        setError("Failed to fetch comments.");
      }
    } catch (err) {
      setError("An error occurred while fetching comments.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refresh, searchParameter, searchParams]);

  // Handle Edit
  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name || "",
      number: user.number || "",
      state: user.state || "",
      district: user.district || "",
      taluka: user.taluka || "",
      address: user.address || "",
    });
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Update
  const handleUpdate = async () => {
    if (
      !formData.name ||
      !formData.state ||
      !formData.district ||
      !formData.taluka ||
      !formData.number ||
      !formData.address
    ) {
      showAlert("Please provide all required fields.", "error");
      return;
    }

    try {
      const response = await axios.put(
        `${api}/api/user/update-user-info/${selectedUser.id}`,
        {
          ...formData,
          photo: null, // Assuming photo is not handled in this form
        }
      );
      showAlert(response.data.message, "success");
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      showAlert(
        error.response?.data?.message || "An error occurred while updating user.",
        "error"
      );
    }
  };

  // Handle Delete
  const handleDelete = async (type,id) => {
    try {
      await axios.delete(`${api}/api/delete-blog-comment/${type}/${id}`);
      showAlert("User deleted successfully.", "success");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      showAlert(
        error.response?.data?.error || "An error occurred.",
        "error"
      );
    }
  };

  const onUserNameClick = (userId) => {
    window.open(`${krushiMahaDomain}/user-info/${userId}`, "_blank");
  };
  const onBlogNameClick = (blogSlug) => {
    window.open(`${krushiMahaDomain}/blog/${blogSlug}`, "_blank");
  }

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setFormData({
      name: "",
      number: "",
      state: "",
      district: "",
      taluka: "",
      address: "",
    });
  };

  return (
    <>
      <div className="tabs -underline-2 js-tabs">
        Total Comments: {comments?.pagination?.totalRecords || 0}
        <div className="tabs__content pt-30 js-tabs-content">
          <div className="tabs__pane -tab-item-1 is-tab-el-active">
            {loading ? (
              <p>Loading comments...</p>
            ) : error ? (
              <p className="text-red-1">{error}</p>
            ) : comments?.results.length === 0 ? (
              <p>No comments available.</p>
            ) : (
              <div className="overflow-scroll scroll-bar-1">
                <table className="table-3 -border-bottom col-12">
                  <thead className="bg-light-2">
                    <tr>
                      <th>Comment</th>
                      <th>User Name</th>
                      <th>Blog Title</th>
                      <th>Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comments.results.map((comment, index) => (
                      <tr key={index}>
                        <td>{comment.comment || "N/A"}</td>
                        <td onClick={()=>{onUserNameClick(comment.user_id)}}>{comment.user_name || "N/A"}</td>
                        <td onClick={()=>{onBlogNameClick(comment.blog_slug)}}>{comment.blog_name || "N/A"}</td>
                        <td>{comment.time || "N/A"}</td>
                        <td>
                          <ActionsButton
                            comment={comment}
                            onEdit={() => {}}
                            onDelete={() => handleDelete(comment.type,comment.id)}
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
        <Pagination
          totalPages={comments?.pagination?.totalPages}
          setSearchParams={setSearchParams}
        />
      </div>

      {/* Modal for Editing User */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{width: "50%", height: "80&", top: "110px"}}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md" style={{maxHeight: "90vh", overflowY: "auto", padding: "20px"}}>
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Mobile</label>
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, state: e.target.value, district: "", taluka: "" }));
                  }}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="" disabled>
                    Select a state
                  </option>
                  {statesArray.map((state, index) => (
                    <option key={index} value={state.id}>
                      {state.id}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">District</label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, district: e.target.value, taluka: "" }));
                  }}
                  className="w-full p-2 border rounded"
                  required
                  disabled={!formData.state}
                >
                  <option value="" disabled>
                    {formData?.state ? "Select a district" : "Select a state first"}
                  </option>
                  {districts
                    .filter((district) => district.stateId === formData.state)
                    .map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.id}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Taluka</label>
                <select
                  name="taluka"
                  value={formData.taluka}
                  onChange={(e) => {
                  setFormData((prev) => ({ ...prev, taluka: e.target.value }));
                  }}
                  className="w-full p-2 border rounded"
                  required
                  disabled={!formData.district}
                >
                  <option value="" disabled>
                    {formData?.district ? "Select a taluka" : "Select a district first"}
                  </option>
                  {talukas
                  .filter((taluka) => taluka.districtId === formData.district)
                  .map((taluka) => (
                    <option key={taluka.id} value={taluka.id}>
                      {taluka.id}
                     </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={closeModal}
                style={{backgroundColor: "#D9534F"}}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                style={{backgroundColor: "#4A90E2", marginLeft: "10px"}}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogCommentTable;