import { useSelector, useDispatch } from "react-redux";
import { addCurrentTab } from "../../../features/hero/findPlaceSlice";
import DateSearch from "../DateSearch";
import GuestSearch from "./GuestSearch";
import LocationSearch from "./LocationSearch";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/utils/apiProvider";
import RegionSearch from "./RegionSearch";
import ServiceSearch from "./ServiceSearch";

const MainFilterSearchBox = () => {
  const { tabs, currentTab } = useSelector((state) => state.hero) || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchCity, setSearchCity] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [cities, setCities] = useState([]);

  const [regions, setRegions] = useState([]);
  const [searchRegion, setSearchRegion] = useState("");
  const [selectedRegion, setselectedRegion] = useState(null);

  const [service, setService] = useState([]);
  const [selectedService, setSelectedService] = useState("");

  const fetchCities = async () => {
    try {
        const response = await axios.get(`${api}/api/city/get-city`);
        if (response.data.success) {
          setCities(response.data.results);
        }
    } catch (error) {
        console.log('failed to fetch the user');
        console.error(error);
    }
  };

  const fetchRegions = async () => {
    if (selectedCity !== null) {
      try {
        const response = await axios.get(`${api}/api/region/get-regions-by-city-id/${selectedCity.city_id}`);
        if (response.data.success) {
          setRegions(response.data.results);
        }
    } catch (error) {
        console.log('failed to fetch the user');
        console.error(error);
    }
    }
  };

  const fetchService = async () => {
    try {
        const response = await axios.get(`${api}/api/service/get-services`);
        if (response.data.success) {
          setService(response.data.results);
        }
    } catch (error) {
        console.log('failed to fetch the user');
        console.error(error);
    }
  };

  const handleSearch = () => {
    const city_id= selectedCity?.city_id || "";
    const city_name = selectedCity?.city_name || "";
    const region_id = selectedRegion?.region_id || "";
    const region_name = selectedRegion?.region_name || "";
    const vendor_service = selectedService || "";

    if (currentTab === "Vendors") {
      const queryParams = new URLSearchParams({ city_id, city_name, region_id, region_name, vendor_service }).toString();
      navigate(`/vendors?${queryParams}`);
    } else {
      const queryParams = new URLSearchParams({ city_id, city_name, region_id, region_name }).toString();
      navigate(`/venues?${queryParams}`);
    }
    
  }

  useEffect(()=>{
    fetchCities();
  },[])

  useEffect(()=>{
    if (currentTab === "Vendors") {
      fetchService();
    }
  },[currentTab])

  useEffect(()=>{
    fetchRegions();
  },[searchCity]);

  return (
    <>
      <div className="tabs__controls d-flex x-gap-30 y-gap-20 justify-center sm:justify-start js-tabs-controls">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            className={`tabs__button text-15 fw-500 text-white pb-4 js-tabs-button ${
              tab?.name === currentTab ? "is-tab-el-active" : ""
            }`}
            onClick={() => dispatch(addCurrentTab(tab?.name))}
          >
            {tab?.name}
          </button>
        ))}
      </div>

      <div className="position-relative mt-30 md:mt-20 js-tabs-content">
        <div className="mainSearch w-auto bg-white px-10 py-10 lg:px-20 lg:pt-5 lg:pb-20 rounded-100">
          <div className="d-flex justify-between items-center">
            <LocationSearch 
              cities={cities}
              searchCity={searchCity}
              setSearchCity={setSearchCity}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              setSearchRegion={setSearchRegion}
              setselectedRegion={setselectedRegion}
            />
            {/* End Location */}
            <RegionSearch
              regions={regions}
              searchRegion={searchRegion}
              setSearchRegion={setSearchRegion}
              selectedRegion={selectedRegion}
              setselectedRegion={setselectedRegion}
            />
            {currentTab === "Vendors" && 
              <ServiceSearch
                service={service}
                setService={setService}
                selectedService={selectedService}
                setSelectedService={setSelectedService}
              />
            }
            <div className="button-item">
              <button
                className="mainSearch__submit button -dark-1 h-60 px-35 col-12 rounded-100 bg-blue-1 text-white"
                onClick={handleSearch}
              >
                <i className="icon-search text-20 mr-10" />
                Search
              </button>
            </div>
            {/* End search button_item */}
          </div>
        </div>
        {/* End .mainSearch */}
      </div>
      {/* End serarchbox tab-content */}
    </>
  );
};

export default MainFilterSearchBox;
