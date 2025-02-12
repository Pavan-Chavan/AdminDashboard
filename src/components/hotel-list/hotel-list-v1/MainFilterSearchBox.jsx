import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { api } from "@/utils/apiProvider";
import RegionSearch from "@/components/hotel-list/hotel-list-v1/RegionSearch";
import LocationSearch from "@/components/hotel-list/hotel-list-v1/LocationSearch";


const MainFilterSearchBox = ({cities, regions, selectedCity, setSelectedCity, searchParams, handleSearchMainFilterSearch}) => {

  const [searchCity, setSearchCity] = useState("");
 
  const [searchRegion, setSearchRegion] = useState("");
  const [selectedRegion, setselectedRegion] = useState(null);


  return (
    <>
      <div className="mainSearch -col-3-big bg-white px-10 py-10 lg:px-20 lg:pt-5 lg:pb-20 rounded-4 mt-30">
        <div className="button-grid items-center d-flex justify-between">
          <LocationSearch 
            cities={cities}
            searchCity={searchCity || searchParams.city_name || ""}
            setSearchCity={setSearchCity}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            setSearchRegion={setSearchRegion}
            setselectedRegion={setselectedRegion}
          />
          {/* End Location */}
          <RegionSearch
            regions={regions}
            searchRegion={searchRegion || searchParams.region_name || ""}
            setSearchRegion={setSearchRegion}
            selectedRegion={selectedRegion}
            setselectedRegion={setselectedRegion}
          />
          <div className="button-item h-full">
            <button className="button -dark-1 py-15 px-40 h-full col-12 rounded-0 bg-blue-1 text-white" onClick={()=>{handleSearchMainFilterSearch(selectedCity,selectedRegion)}}>
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
