import Sidebar from "../common/Sidebar";
import Header from "../../../header/dashboard-header";
import { useNavigate} from "react-router-dom";
import Footer from "../common/Footer";
import BookingTable from "./components/BookingTable";
import { useEffect, useState } from "react";
import { getUserId, isLoggedInUser } from "@/utils/DOMUtils";
import axios from "axios";
import { api } from "@/utils/apiProvider";

const index = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(()=>{
    if(localStorage.getItem("userId") === null){
      navigate("/");
    }
  })

  const [filterData, setFilterData] = useState([]);
  const fetchBookingDetails  = async () => {
    try {
      const response = await axios.get(`${api}/api/booking/get-bookings`,{
        headers : {
          user_id: getUserId()
        }
      });
      if (response.status === 200) {
        setFilterData(response.data.results.filter((item) => { return item.type === tabItems[0].toLowerCase()}));
        setData(response.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const tabItems = [
    "Vendor",
    "Venue"
  ];

  useEffect(()=>{
      fetchBookingDetails()
    },[])
    useEffect(()=>{
      if (!isLoggedInUser()) {
        navigate("/")
      }
    })

  return (
    <>
      {/*  */}
      {/* End Page Title */}

      <div className="header-margin"></div>

      <Header />
      {/* End dashboard-header */}

      <div className="dashboard">
        <div className="dashboard__sidebar bg-white scroll-bar-1">
          <Sidebar />
          {/* End sidebar */}
        </div>
        {/* End dashboard__sidebar */}

        <div className="dashboard__main">
          <div className="dashboard__content bg-light-2">
            <div className="row y-gap-20 justify-between items-end pb-60 lg:pb-40 md:pb-32">
              <div className="col-12">
                <h1 className="text-30 lh-14 fw-600">Booking History</h1>
                <div className="text-15 text-light-1">
                  See All Your Venues And Vendors Booking Here.
                </div>
              </div>
              {/* End .col-12 */}
            </div>
            {/* End .row */}

            <div className="py-30 px-30 rounded-4 bg-white shadow-3">
            <BookingTable data={data} tabItems={tabItems} setFilterData={setFilterData} filterData={filterData}/>
              {/* End tabs */}
            </div>

            <Footer />
          </div>
          {/* End .dashboard__content */}
        </div>
        {/* End dashbaord content */}
      </div>
      {/* End dashbaord content */}
    </>
  );
};

export default index;
