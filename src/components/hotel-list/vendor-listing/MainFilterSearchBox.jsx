import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { api } from "@/utils/apiProvider";
import RegionSearch from "@/components/hotel-list/hotel-list-v1/RegionSearch";
import LocationSearch from "@/components/hotel-list/hotel-list-v1/LocationSearch";
import ServiceSearch from "@/components/hero/hero-1/ServiceSearch";


const MainFilterSearchBox = ({cities, regions, selectedCity, setSelectedCity,selectedRegion, searchParams, setselectedRegion, handleSearchMainFilterSearch, services}) => {

  const [searchCity, setSearchCity] = useState(searchParams.city_name || "");
  const [searchRegion, setSearchRegion] = useState(searchParams.region_name || "");
  const [selectedService, setSelectedService] = useState(searchParams?.vendor_service || "");

  return (
    <>
      <div className="mainSearch -col-3-big bg-white px-10 py-10 lg:px-20 lg:pt-5 lg:pb-20 rounded-4 mt-30">
        <div className="button-grid items-center d-flex justify-between">
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
          <ServiceSearch
              service={services}
              selectedService={selectedService}
              setSelectedService={setSelectedService}
          />
          <div className="button-item h-full">
            <button className="button -dark-1 py-15 px-40 h-full col-12 rounded-0 bg-blue-1 text-white" onClick={()=>{handleSearchMainFilterSearch(selectedCity,selectedRegion,selectedService)}}>
              <i className="icon-search text-20 mr-10" />
              Search
            </button>
          </div>
          {/* End search button_item */}
        </div>
      </div>
    </>
  );
};

export default MainFilterSearchBox;
