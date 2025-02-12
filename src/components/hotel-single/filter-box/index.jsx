import GuestSearch from "./GuestSearch";
import DateSearch from "./DateSearch";
import { showAlert } from "@/utils/isTextMatched";
import { useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { getId, getUserId, isLoggedInUser } from "@/utils/DOMUtils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "@/utils/apiProvider";

const index = ({ type = "vendor", id }) => {
  const navigate = useNavigate();
  const today = new DateObject();
  const [bookingDates, setBookingDates] = useState([
    today,
    new DateObject().add(1, "days"),
  ]);
  const [appointmentDate, setAppointmentDate] = useState(today);

  const handleOnClick = async (e) => {
    e.preventDefault();
    if (isLoggedInUser()) {
      const object = type === "venue" ? { venue_id: id } : { vendor_id: id };
      const apiBody = {
        user_id: getUserId(),
        type: type,
        status: "Pending",
        booking_dates: bookingDates.toString(),
        appointment_date: appointmentDate.toString(),
        ...object,
      };
      try {
        const response = await axios.post(
          `${api}/api/booking/create-booking`,
          apiBody
        );
        if (response.status === 201) {
          showAlert("Enquiry Sent", "success");
        } else {
          showAlert(response.data.error, "danger");
        }
      } catch (error) {
        showAlert("Something went wrong");
        console.error("Error:", error);
      }
    } else {
      navigate("/signup", {
        state: { type: type, id: id },
      });
    }
  };

  return (
    <>
      <div className="col-12">
        <div className="searchMenu-date px-20 py-10 border-light rounded-4 -right js-form-dd js-calendar">
          <div>
            <h4 className="text-15 fw-500 ls-2 lh-16">From Date - To Date</h4>
            <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
              <DatePicker
                inputClass="custom_input-picker"
                containerClassName="custom_container-picker"
                value={bookingDates}
                onChange={setBookingDates}
                numberOfMonths={2}
                offsetY={10}
                range
                rangeHover
                format="DD MMMM YYYY"
                minimumDate={today} // Start date is today
                maximumDate={today.add(5, "days")} // Limit selection to 5 days from today
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-12">
        {type === "venue" && (
          <div className="searchMenu-date px-20 py-10 border-light rounded-4 -right js-form-dd js-calendar">
            <div>
              <h4 className="text-15 fw-500 ls-2 lh-16">Schedule Visit</h4>
              <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
                <DatePicker
                  inputClass="custom_input-picker"
                  containerClassName="custom_container-picker"
                  value={appointmentDate}
                  onChange={setAppointmentDate}
                  numberOfMonths={1}
                  offsetY={10}
                  rangeHover
                  format="DD MMMM YYYY HH:mm"
                  minimumDate={today} // Start date is today
                  maximumDate={today.add(5, "days")} // Limit to 5 days from today
                  plugins={[
                    <TimePicker position="bottom" hideSeconds mStep={30} />,
                  ]}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="col-12">
        <div className="button-item h-full">
          <button
            className="button -dark-1 px-35 h-60 col-12 bg-blue-1 text-white"
            onClick={handleOnClick}
          >
            Send Enquiry
          </button>
        </div>
      </div>
    </>
  );
};

export default index;
