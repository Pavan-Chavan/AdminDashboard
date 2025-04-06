import React, { useEffect, useRef, useState } from "react";
import MetaComponent from "@/components/common/MetaComponent";
import Header from "@/components/header/dashboard-header";
import Footer from "@/components/dashboard/admin-dashboard/common/Footer";
import { webSocketServer, api, krushiMahaDomain } from "@/utils/apiProvider";
import Sidebar from "../../../../components/dashboard/admin-dashboard/common/Sidebar";
import axios from "axios";
import { set } from "lodash";

const metadata = {
  title: "Admin Push Notification | WedEazzy",
  description: "WedEazzy - Your Dream Wedding Partner",
};

export default function PushNotification() {
  const [ws, setWs] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [reconnecting, setReconnecting] = useState(false);
  const [WebSocketStatus, setWebSocketStatus] = useState("Connecting...");
  const [notificationData, setNotificationData] = useState({
    title: "",
    description: "",
    badge: "/badge.png",
    vibrate: [200, 100, 200],
    requireInteraction: true,
    tag: "general",
    renotify: false,
    image: "",
    url:"https://jiokheti.com",
    icon: "/JK.png",
  });
  const [notificationStats, setNotificationStats] = useState({
    totalSubscriptions: 0,
    totalSent: 0,
    totalFailed: 0,
    totalPending: 0,
    totalSuccess: 0,
    message: "",
  });

  useEffect(() => {
    const socket = new WebSocket(webSocketServer);
    setWs(socket);
    setWebSocketStatus(socket.readyState);
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotificationStats({
        totalSubscriptions: data.TotalSubscriptions,
        totalSent: data.TotalSent,
        totalFailed: data.TotalFailed,
        totalPending: data.TotalPending,
        totalSuccess: data.TotalSuccess,
        message: data.message,
      });
    };
    return () => socket.close();
  }, [reconnecting]);

  const handleInputChange = (field, value) => {
    setNotificationData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;
  
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result; // Base64 string of the image
      const imageName = imageFile.name.split(".")[0]; // Extract the name without extension
  
      try {
        setIsImageUploading(true);
        const response = await axios.post(`${krushiMahaDomain}/api/NotificationImageUpload`, {
          image: base64Image,
          imageName,
        }, {
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.data.success) {
          setNotificationData((prev) => ({
            ...prev,
            image: "https://jiokheti.com" + response.data.imageUrl,
          }));
          console.log("Image uploaded successfully:", response.data.imageUrl);
          setIsImageUploaded(true);
          alert("Image uploaded successfully!");
        }
        setIsImageUploading(false);
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Failed to upload image");
      }
    };
  
    reader.readAsDataURL(imageFile); // Convert the file to Base64
  };

  const validateFields = () => {
    const requiredFields = ["title", "description"];
    return requiredFields.every(
      (field) => notificationData[field].trim() !== ""
    );
  };

  const handleSubmit = () => {
    if (!validateFields()) {
      alert("Please fill in all required fields (Title and Description)");
      return;
    }

    if (!isImageUploaded && notificationData.image) {
      alert("Please upload the image before sending the notification");
      return;
    }

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          type: "PushNotification",
          data: notificationData,
        })
      );
      // Reset form and close modal
      setNotificationData({
        title: "",
        description: "",
        badge: "/badge.png",
        vibrate: [200, 100, 200],
        requireInteraction: true,
        tag: "general",
        renotify: false,
        image: "",
        url:"https://jiokheti.com",
        icon: "/JK.png",
      });
    } else {
      setReconnecting(!reconnecting)
      console.error("WebSocket connection is not open" + ws.readyState);
    }
  };

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImageFile(null); 
    setIsImageUploaded(false); 
    setImagePreview(null); 
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the input value
    }
  }

  return (
    <>
      <div>
        <div className="col-auto">
          <button
            className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
            onClick={() => setShowModal(true)}
          >
            Add Push Notification
            <div className="icon-arrow-top-right ml-15"></div>
          </button>
        </div>
            {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ height: "90%", overflow: "scroll" }}>
              <h3>Add Push Notification</h3>
              <div className="row x-gap-20 y-gap-20">
                  <div className="form-input">
                    <input
                      type="text"
                      required
                      value={notificationData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                    />
                    <label className="lh-1 text-16 text-light-1">Title *</label>
                  </div>
                  <div className="form-input">
                    <input
                      required
                      value={notificationData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                    />
                    <label className="lh-1 text-16 text-light-1">Description *</label>
                  </div>
                  <div className="form-input">
                    <input
                      required
                      type="text"
                      value={notificationData.url}
                      onChange={(e) =>
                        handleInputChange("url", e.target.value)
                      }
                    />
                    <label className="lh-1 text-16 text-light-1">URL</label>
                  </div>
                  <div className="form-input">
                    <input
                      type="text"
                      value={notificationData.badge}
                      style={{width:'70%'}}
                      onChange={(e) => handleInputChange("badge", e.target.value)}
                    />
                    <label className="lh-1 text-16 text-light-1">Badge URL</label>
                    <div className="d-flex ratio ratio-1:1 " style={{height:'60px', width:'60px'}}>
                      <img src={`https://jiokheti.com/${notificationData.badge}`} alt="image" className="img-ratio rounded-4" />
                    </div>
                  </div>
                  <div className="form-input">
                    <input
                      type="text"
                      value={notificationData.vibrate.join(",")}
                      onChange={(e) =>
                        handleInputChange(
                          "vibrate",
                          e.target.value.split(",").map(Number)
                        )
                      }
                    />
                    <label className="lh-1 text-16 text-light-1">
                      Vibration Pattern (comma-separated)
                    </label>
                  </div>
                  <div className="" style={{display: 'flex',justifyContent: 'flex-start', alignItems: 'center'}}>
                    <input
                      type="checkbox"
                      style={{width:'40px'}}
                      checked={notificationData.requireInteraction}
                      onChange={(e) =>
                        handleInputChange("requireInteraction", e.target.checked)
                      }
                    />
                    <label>
                      Require Interaction (If true, notification stays on screen until user interacts with it)
                    </label>
                  </div>
                  <div className="form-input" style={{border: "2px solid #dbdbdb59"}}>
                    <select
                      value={notificationData.tag}
                      onChange={(e) => handleInputChange("tag", e.target.value)}
                    >
                      <option value="">Select Notification tag</option>
                      <option value="general">General - For all general notifications</option>
                      <option value="alert">Alert - Urgent warnings or notices</option>
                      <option value="message">Message - Personal chats or texts</option>
                      <option value="update">Update - News or latest changes</option>
                    </select>
                  </div>
                  <label style={{display: 'flex',justifyContent: 'flex-start', alignItems: 'center'}}>
                    <input
                      type="checkbox"
                      style={{width:'40px'}}
                      checked={notificationData.renotify}
                      onChange={(e) =>
                        handleInputChange("renotify", e.target.checked)
                      }
                    />
                    Renotify (When true, replacing a notification with same tag will vibrate/sound again)
                  </label>
                  <div className="form-input">
                    <input
                      type="text"
                      style={{width:'70%'}}
                      value={notificationData.icon}
                      onChange={(e) => handleInputChange("icon", e.target.value)}
                    />
                    <label className="lh-1 text-16 text-light-1">Icon URL</label>
                    <div className="d-flex ratio ratio-1:1 " style={{height:'60px', width:'60px', margin: '6px'}}>
                      <img src={`https://jiokheti.com/${notificationData.icon}`} alt="image" className="img-ratio rounded-4" />
                    </div>
                  </div>
                  <div className="form-input" style={{display: 'flex',flexDirection: 'column', gap: '8px'}}>
                    <div className="lh-1 text-16 text-light-1" >Notification Image </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                  {imageFile && (
                    <div style={{display:'flex', flexDirection:'column'}}><div className="col-auto">
                      <div className="d-flex ratio ratio-1:1 w-200">
                        <img src={imagePreview} ref={fileInputRef} alt="image" className="img-ratio rounded-4" />
                        <div className="d-flex justify-end px-10 py-10 h-100 w-1/1 absolute" onClick={handleImageRemove}>
                          <div className="size-40 bg-white rounded-4 flex-center cursor-pointer">
                            <i className="icon-trash text-16" />
                          </div>
                        </div>
                      </div>
                    </div>
                  <button
                    className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
                    onClick={handleImageUpload}
                    style={{ marginTop: "10px", width: '200px' }}
                  >
                    {isImageUploading ? "Uploading..." : "Upload Image"}
                  </button></div>
                  )}
                <div className="modal-actions">
                  <button
                    className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
                    onClick={handleSubmit}
                    disabled={!isImageUploaded && notificationData.image && ws && ws.readyState === WebSocket.OPEN }
                  >
                    {ws.readyState === WebSocket.OPEN ? "Send Push Notification" : "Retry Connection"}
                    <div className="icon-arrow-top-right ml-15" />
                  </button>
                  <button
                    className="button h-50 px-24 bg-light-2 text-dark-1"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
                <div className="py-30 px-30 rounded-4 bg-white shadow-3">
                  <div className="col-xl-10">
                    <div className="notification-stats">
                      <h3>Notification Stats</h3>
                      <p>Total Subscriptions: {notificationStats.totalSubscriptions}</p>
                      <p>Total Sent: {notificationStats.totalSent}</p>
                      <p>Total Failed: {notificationStats.totalFailed}</p>
                      <p>Total Pending: {notificationStats.totalPending}</p>
                      <p>Total Success: {notificationStats.totalSuccess}</p>
                      <p>Message: {notificationStats.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}