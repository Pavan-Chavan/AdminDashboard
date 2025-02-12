import { api } from "@/utils/apiProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import DateSearch from "../DateSearch";

const ServiceSearch = ({service = [], selectedService, setSelectedService}) => {

  const handleOptionClick = (service) => {
    setSelectedService(service);
  };

  return (
    <>
      <div className="searchMenu-loc px-40 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
        <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
        >
          <h4 className="text-15 fw-500 ls-2 lh-16">Service</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
            <input
              autoComplete="off"
              type="search"
              placeholder="Need a service ?"
              className="js-search js-dd-focus"
              value={selectedService}
              onChange={(e) => {setSelectedService(e.target.value)}}
            />
          </div>
        </div>
        {/* End location Field */}

        <div className="shadow-2 dropdown-menu min-width-400">
          <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
            <ul className="y-gap-5 js-results">
              {service.map((serviceItem) => (
                <li
                  className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
                    selectedService && selectedService === serviceItem.service_name ? "active" : ""
                  }`}
                  key={serviceItem.service_id}
                  role="button"
                  onClick={() => handleOptionClick(serviceItem.service_name)}
                >
                  <div className="d-flex">
                    <div className="icon-location-2 text-light-1 text-20 pt-4" />
                    <div className="ml-10">
                      <div className="text-15 lh-12 fw-500 js-search-option-target">
                        {serviceItem.service_name}
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

export default ServiceSearch;
