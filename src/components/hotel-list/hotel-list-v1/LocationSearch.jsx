import { api } from "@/utils/apiProvider";
import axios from "axios";
import { useEffect, useState } from "react";

const SearchBar = ({cities, searchCity, setSearchCity, selectedCity, setSelectedCity, setSearchRegion, setselectedRegion}) => {

  const handleOptionClick = (city) => {
    setSearchCity(city.city_name);
    setSelectedCity(city);
  };

  return (
    <>
      <div className="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
        <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
        >
          <h4 className="text-15 fw-500 ls-2 lh-16">City</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
            <input
              autoComplete="off"
              type="search"
              placeholder="Which is your city ?"
              className="js-search js-dd-focus"
              value={searchCity}
              onChange={(e) => {
                setSearchRegion(""); 
                setselectedRegion(null)
                setSearchCity(e.target.value); 
              }}
            />
          </div>
        </div>
        {/* End location Field */}

        <div className="shadow-2 dropdown-menu min-width-400">
          <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
            <ul className="y-gap-5 js-results">
              {cities.map((city) => (
                <li
                  className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
                    selectedCity && selectedCity.city_id === city.city_id ? "active" : ""
                  }`}
                  key={city.city_id}
                  role="button"
                  onClick={() => handleOptionClick(city)}
                >
                  <div className="d-flex">
                    <div className="icon-location-2 text-light-1 text-20 pt-4" />
                    <div className="ml-10">
                      <div className="text-15 lh-12 fw-500 js-search-option-target">
                        {city.city_name}
                      </div>
                      <div className="text-14 lh-12 text-light-1 mt-5">
                        {city.city_address}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
