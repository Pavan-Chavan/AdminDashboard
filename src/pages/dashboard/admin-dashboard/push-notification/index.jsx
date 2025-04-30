import React, { useEffect, useState } from "react";
import axios from "axios";
import MetaComponent from "@/components/common/MetaComponent";
import Header from "@/components/header/dashboard-header";
import Footer from "@/components/dashboard/admin-dashboard/common/Footer";
import Sidebar from "../../../../components/dashboard/admin-dashboard/common/Sidebar";
import AddPushNotification from "@/components/dashboard/admin-dashboard/PushNotification/AddPushNotification";
import Pagination from "@/components/hotel-list/common/Pagination";
import { api } from "@/utils/apiProvider";

const metadata = {
  title: "Admin Add Venue | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};
const allowedUser = ["admin", "venue-user"];
export default function PushNotification({ searchParameter = "", refresh }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({ page: 1, limit: 30 });
  const [error, setError] = useState(null);
  const [subCount, setSubCount] = useState(0);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${api}/api/push-notification/notifications`, {
        params: {
          ...searchParams,
          get_all: true,
          search: searchParameter
        }
      });
      if (response.status === 200) {
        setNotifications(response.data);
      } else {
        setError("Failed to fetch notifications.");
      }
    } catch (err) {
      setError("An error occurred while fetching notifications.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubCount = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${api}/api/push-notification/notifications/sub-count`);
      if (response.status === 200) {
        setSubCount(response.data.totalRecords);
      } else {
        setError("Failed to fetch notifications.");
      }
    } catch (err) {
      setError("An error occurred while fetching notifications.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Format vibrate array to readable string
  const renderVibrate = (vibrate) => {
    return vibrate ? vibrate.join(", ") : "N/A";
  };

  useEffect(() => {
    fetchNotifications();
    fetchSubCount();
  }, [refresh, searchParams, searchParameter]);

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
              <div className="col-12 d-flex justify-between">
                <div><h1 className="text-30 lh-14 fw-600">Push Notification</h1>
                <div className="text-15 text-light-1">
                  Manage the list of all available push notifications here.
                </div>
                <div className="text-15 text-light-1">
                  Total Subscriptions: {subCount}
                </div></div>
                <div className="col-auto">
                  <AddPushNotification/>
                </div>
              </div>
            </div>
            <div className="py-30 px-30 rounded-4 bg-white shadow-3">
            <div className="tabs -underline-2 js-tabs">
              <div className="tabs__content pt-30 js-tabs-content">
                <div className="tabs__pane -tab-item-1 is-tab-el-active">
                  {loading ? (
                    <p>Loading notifications...</p>
                  ) : error ? (
                    <p className="text-red-1">{error}</p>
                  ) : notifications.results.length === 0 ? (
                    <p>No notifications available.</p>
                  ) : (
                    <div className="overflow-scroll scroll-bar-1">
                      <table className="table-3 -border-bottom col-12">
                        <thead className="bg-light-2">
                          <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Tag</th>
                            <th>Total Subscriptions</th>
                            <th>Total Sent</th>
                            <th>Total Success</th>
                            <th>Total Failed</th>
                            <th>Total Pending</th>
                            <th>Created At</th>
                          </tr>
                        </thead>
                        <tbody>
                          {notifications.results.map((notification, index) => (
                            <tr key={index}>
                              <td>{notification.title}</td>
                              <td>{notification.description}</td>
                              <td>{notification.tag}</td>
                              <td>{notification.TotalSubscriptions}</td>
                              <td>{notification.TotalSent}</td>
                              <td>{notification.TotalSuccess}</td>
                              <td>{notification.TotalFailed}</td>
                              <td>{notification.TotalPending}</td>
                              <td>{new Date(notification.created_at).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
              <Pagination 
                totalPages={notifications?.pagination?.totalPages} 
                setSearchParams={setSearchParams}
              />
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
