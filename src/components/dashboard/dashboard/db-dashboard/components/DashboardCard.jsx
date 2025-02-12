import { isUserLoggedIn } from "@/utils/DOMUtils"; // Assuming you have this method for checking if a user is logged in
import { useState, useEffect } from "react";
import axios from 'axios'; // If you need to fetch the booking data
import { api } from "@/utils/apiProvider";
import { getId, getRole } from "@/utils/DOMUtils";


const userData = [
  {
    title: "Pending Bookings",
    dataKey: "Pending",
    description: "Bookings waiting for confirmation",
    icon: "/img/dashboard/icons/1.svg",
  },
  {
    title: "In-Progress Bookings",
    dataKey: "In Progress",
    description: "Bookings currently being processed",
    icon: "/img/dashboard/icons/4.svg",
  },
  {
    title: "Confirmed Bookings",
    dataKey: "Confirmed",
    description: "Confirmed bookings ready for execution",
    icon: "/img/dashboard/icons/3.svg",
  },
  {
    title: "Cancelled Bookings",
    dataKey: "Cancelled",
    description: "Cancelled bookings",
    icon: "/img/dashboard/icons/2.svg",
  },
];

const UserDashboardCard = ({ userBookingsData }) => {
  const [userStatus, setUserStatus] = useState(userBookingsData || []);

  useEffect(() => {
    // If you need to fetch user data dynamically, you can do it here.
    const fetchUserBookingData = async () => {
      try {
        const response = await axios.get(`${api}/api/dashboard/booking-status-count?type=${getRole()}&id=${getId()}`);
        if (response.data) {
          setUserStatus(response.data); // Assuming the response has 'data' with the booking counts
        }
      } catch (error) {
        console.error("Error fetching user booking data", error);
      }
    };

    if (isUserLoggedIn()) {
      fetchUserBookingData();
    }
  }, []);

  const getBookingStatusCount = (item) => {
    const foundStatus = userStatus.find((status) => status.status === item.dataKey);
    return foundStatus?.count || "0"; // Default to 0 if no count found
  };

  return (
    <div className="row y-gap-30">
      {userData.map((item, index) => (
        <div key={index} className="col-xl-3 col-md-6">
          <div className="py-30 px-30 rounded-4 bg-white shadow-3">
            <div className="row y-gap-20 justify-between items-center">
              <div className="col-auto">
                <div className="fw-500 lh-14">{item.title}</div>
                <div className="text-26 lh-16 fw-600 mt-5">{getBookingStatusCount(item)}</div>
                
              </div>
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserDashboardCard;
