import { useState } from "react";
import Pagination from "../../common/Pagination";
import ActionsButton from "../components/ActionsButton";
import { convertUnixToDate, getClassOfStatus } from "@/utils/DOMUtils";

const BookingTable = ({tabItems, data=[], filterData, setFilterData}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index, tab = "") => {
    setActiveTab(index);
    setFilterData(data.filter((item)=>{return tab.toLowerCase() === item.type}))
  };

  const renderBookingStatus = (item) => {
      return (
      <span style={{width:"max-content"}}className={`rounded-100 py-4 px-10 d-flex text-center text-14 fw-500 ${getClassOfStatus(item.status)}`}>
        {item.status}
      </span>)
    }

  const getBookingDate = (date) => {
    const booking_dates = date ? JSON.parse(date).split(",").join(" to ") : "N/A";
    return booking_dates;
  }

  return (
    <>
      <div className="tabs -underline-2 js-tabs">
        <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls">
          {tabItems.map((item, index) => (
            <div className="col-auto" key={index}>
              <button
                className={`tabs__button text-18 lg:text-16 text-light-1 fw-500 pb-5 lg:pb-0 js-tabs-button ${
                  activeTab === index ? "is-tab-el-active" : ""
                }`}
                onClick={() => handleTabClick(index,item)}
              >
                {item}
              </button>
            </div>
          ))}
        </div>
        {/* End tabs */}

        <div className="tabs__content pt-30 js-tabs-content">
          <div className="tabs__pane -tab-item-1 is-tab-el-active">
            <div className="overflow-scroll scroll-bar-1">
              <table className="table-3 -border-bottom col-12">
                <thead className="bg-light-2">
                  <tr>
                    {activeTab === 1 ? <th>Venue Name</th> : <th>Vendor Name</th>}
                    {activeTab === 1 ? <th>Venue Phone No</th> : <th>Vendor Phone No</th>}
                    {activeTab === 1 && <th>Appointment Date</th>}
                    <th>Booking Dates</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filterData.map((item)=>(
                    <tr>
                      <td>{activeTab === 1 ? item?.venue_name : item?.vendor_name}</td>
                      <td>{activeTab === 1 ? item?.venue_phone_no : item?.contact_number}</td>
                      {activeTab === 1 && <td>{convertUnixToDate(item?.appointment_date)}</td>}
                      <td className="fw-500">{getBookingDate(item.booking_dates)}</td>
                      <td>
                        {renderBookingStatus(item)}
                      </td>
                      <td>
                        <ActionsButton />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingTable;
