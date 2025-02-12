import { useState, useEffect } from "react";
import axios from "axios";
import ActionsButton from "./ActionsButton";
import { api } from "@/utils/apiProvider";
import { showAlert } from "@/utils/isTextMatched";
import { useNavigate } from "react-router-dom";
import { getId } from "@/utils/DOMUtils";
import "../../../../../styles/modals.css";
import Pagination from "@/components/hotel-list/common/Pagination";

const VenueTable = ({ searchParameter="", refresh }) => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({ page: 1, limit: 10 }); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch venues
  const fetchVenues = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await axios.get(`${api}/api/venue/get-venue`,{
        headers: {
          id:  getId()
        },
        params : {
          ...searchParams,
          search : searchParameter
        }
      });
      if (response.data.success) {
        setVenues(response.data);
      } else {
        setError("Failed to fetch venues.");
      }
    } catch (err) {
      setError("An error occurred while fetching venues.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, [refresh]);
  // Handle Search
  useEffect(() => {
    fetchVenues();    
  }, [searchParameter, searchParams]);

  // Edit venue
  const handleEdit = (venue) => {
    navigate("/admin-dashboard/venue/edit",{state: venue});
  };

  // Delete venue
  const handleDelete = async (id) => {
      try {
        await axios.delete(`${api}/api/venue/delete-venue/${id}`);
        showAlert("Venue deleted successfully.","success");
        fetchVenues(); // Refresh venues list
      } catch (error) {
        console.error("Error deleting venue:", error);
        showAlert(error.response?.data?.error || "An error occurred.","error");
      }
  };

  return (
    <>
      <div className="tabs -underline-2 js-tabs">
        <div className="tabs__content pt-30 js-tabs-content">
          <div className="tabs__pane -tab-item-1 is-tab-el-active">
            {loading ? (
              <p>Loading venues...</p>
            ) : error ? (
              <p className="text-red-1">{error}</p>
            ) : venues.length === 0 ? (
              <p>No venues available.</p>
            ) : (
              <div className="overflow-scroll scroll-bar-1">
                <table className="table-3 -border-bottom col-12">
                  <thead className="bg-light-2">
                    <tr>
                      <th>Owner Name</th>
                      <th>Venue Name</th>
                      <th>City Name</th>
                      <th>Region Name</th>
                      <th>Venue Rate</th>
                      <th>Veg Package Price</th>
                      <th>Non-Veg Package Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {venues.results.map((venue, index) => (
                      <tr key={index}>
                        <td>{venue.user_name}</td>
                        <td>{venue.venue_name} </td>
                        <td>{venue.city_name || "N/A"}</td>
                        <td>{venue.region_name || "N/A"}</td>
                        <td>{venue.venue_rate || "N/A"}</td>
                        <td>{venue.veg_package_price || "N/A"}</td>
                        <td>{venue.non_veg_package_price || "N/A"}</td>
                        <td
                          className={
                            venue.is_enable
                              ? "status-published"
                              : "status-draft"
                          }
                        >
                          {venue.is_enable ? "Published" : "Draft"}
                        </td>
                        <td>
                          <ActionsButton
                            venue={venue} // Passing the venue data
                            onEdit={() => handleEdit(venue)} // Handle Edit
                            onDelete={() => handleDelete(venue.venue_id)} // Handle Delete
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
        <Pagination totalPages={venues?.pagination?.totalPages} setSearchParams={setSearchParams}/>
      </div>
    </>
  );
};

export default VenueTable;