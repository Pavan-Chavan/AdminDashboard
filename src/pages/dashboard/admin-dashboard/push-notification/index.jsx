import React, { useEffect, useState } from "react";

import MetaComponent from "@/components/common/MetaComponent";
import Header from "@/components/header/dashboard-header";
import Footer from "@/components/dashboard/admin-dashboard/common/Footer";
import { webSocketServer } from "@/utils/apiProvider";
import Sidebar from "../../../../components/dashboard/admin-dashboard/common/Sidebar";
import { set } from "lodash";
const metadata = {
  title: "Admin Add Venue | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};
const allowedUser = ["admin", "venue-user"];
export default function PushNotification() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [ws, setWs] = useState(null);
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
      console.log("Received data:", data.message);
    };
    return () => socket.close();
  }, []);

  const handleSubmit = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({type:"PushNotification"  , data: {title, description}}));
    }
  }
  return (
    <>
      <MetaComponent meta={metadata} />
      <>
      <div className="header-margin"></div>
      <Header />
      <div className="dashboard">
        <div className="dashboard__sidebar bg-white scroll-bar-1">
          <Sidebar />
        </div>
        <div className="dashboard__main">
          <div className="dashboard__content bg-light-2">
            <div className="row y-gap-20 justify-between items-end pb-60 lg:pb-40 md:pb-32">
              <div className="col-12">
                <h1 className="text-30 lh-14 fw-600">Push Notification</h1>
                <div className="text-15 text-light-1">
                  Seamlessly add your blog to our platform.
                </div>
              </div>
            </div>
            <div className="py-30 px-30 rounded-4 bg-white shadow-3">
              <div className="col-xl-10">
                <div className="row x-gap-20 y-gap-20">
                  <div className="col-12">
                    <div className="form-input">
                      <input
                        type="text"
                        required
                        name="title"
                        value={title}
                        onChange={(e) => {setTitle(e.target.value)}}
                      />
                      <label className="lh-1 text-16 text-light-1">Title</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-input">
                      <input
                        type="text"
                        required
                        name="description"
                        value={description}
                        onChange={(e) => {setDescription(e.target.value)}}
                      />
                      <label className="lh-1 text-16 text-light-1">Description</label>
                    </div>
                  </div>
                  <button className="button h-50 px-24 -dark-1 bg-blue-1 text-white" onClick={handleSubmit} style={{ marginLeft: '10px', width: '30%' }} >
                    Send Push Notification <div className="icon-arrow-top-right ml-15" />
                  </button>
                    <div className="col-12">
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

            <Footer />
          </div>
        </div>
      </div>
    </>
    </>
  );
}
