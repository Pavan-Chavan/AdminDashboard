import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "@/utils/apiProvider";
import { showAlert } from "@/utils/isTextMatched";
import { getId, getUserId } from "@/utils/DOMUtils";
import AvatarUploader from "./AvatarUploader";
import { Roles } from "@/constant/constants";

const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    image:""
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [loading, setLoading] = useState(false);

  // Fetch user details when the component mounts
  useEffect(() => {
    const fetchUserDetails = async (id) => {
      try {
        setLoading(true);
        const response = await axios.get(`${api}/api/user/get-users/${id}`   

        );
        setFormData({
          name: response.data.name || "",
          email: response.data.email || "",
          mobile: response.data.mobile || "",
          image: JSON.parse(response.data.image) || "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        showAlert("Failed to fetch user details", "danger");
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails(getUserId());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "newPassword" || name === "confirmPassword") {
      setPasswordsMatch(
        name === "newPassword"
          ? value === formData.confirmPassword
          : value === formData.newPassword
      );
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordsMatch) {
      showAlert("Passwords do not match", "danger");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put(`${api}/api/user/update-users/${getUserId()}`,{
        ...formData,
        image: JSON.stringify(formData.image)
      });
      setLoading(false);

      if (response.data.success) {
        showAlert("Profile updated successfully", "success");
      } 
      else {
        showAlert(response.data.message || "Update failed", "danger");
      }
    } catch (error) {
      setLoading(false);
      showAlert(error?.response?.data?.message || "Update failed", "danger");
      console.error("Error updating profile:", error);
    }
    
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && (
        <form onSubmit={handleSubmit}>
          <AvatarUploader formData={formData} setFormData={setFormData} />
          {/* End AvatarUploader */}

          <div className="border-top-light mt-30 mb-30" />

          <div className="col-xl-9">
            <div className="row x-gap-20 y-gap-20">
              <div className="col-md-6">
                <div className="form-input">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label className="lh-1 text-16 text-light-1">Full Name</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-input">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label className="lh-1 text-16 text-light-1">Email</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-input">
                  <input
                    type="number"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                  <label className="lh-1 text-16 text-light-1">
                    Phone Number
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-input">
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                  />
                  <label className="lh-1 text-16 text-light-1">
                    Current Password
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-input">
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                  />
                  <label className="lh-1 text-16 text-light-1">
                    New Password
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-input">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <label className="lh-1 text-16 text-light-1">
                    New Password Again
                  </label>
                </div>
                {!passwordsMatch && (
                  <div className="text-15 lh-15 text-light-1 ml-10">
                    Passwords must match.
                  </div>
                )}
              </div>
            </div>
          </div>

          <br />

          <div className="col-12">
            <div className="row x-gap-10 y-gap-10">
              <div className="col-auto">
                <button
                  type="submit"
                  className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
                >
                  Save Changes <div className="icon-arrow-top-right ml-15" />
                </button>
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className="button h-50 px-24 -blue-1 bg-blue-1-05 text-blue-1"
                  onClick={() => {
                    // Reset formData to original user details
                    setFormData({
                      name: "",
                      email: "",
                      mobile: "",
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default PersonalInfo;
