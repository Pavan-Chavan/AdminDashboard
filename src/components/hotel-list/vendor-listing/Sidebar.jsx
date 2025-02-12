import DealsFilter from "../sidebar/DealsFilter";
import Map from "../sidebar/Map";
import SearchBox from "../sidebar/SearchBox";
import PopularFilters from "../sidebar/PopularFilters";
import AminitesFilter from "../sidebar/AminitesFilter";
import RatingsFilter from "../sidebar/RatingsFilter";
import GuestRatingFilters from "../sidebar/GuestRatingFilters";
import StyleFilter from "../sidebar/StyleFilter";
import NeighborhoddFilter from "../sidebar/NeighborhoddFilter";
import PirceSlider from "../sidebar/PirceSlider";
import InputRange from "react-input-range";
import { useState } from "react";

const Sidebar = ({onFilterChange, searchParams}) => {
  const [rate, setRate] = useState({ min: searchParams.vendor_rate.min, max: searchParams.vendor_rate.max });

  const handleOnChange = (value) => {
    setRate(value);
    onFilterChange(value,"vendor_rate");
  };

  return (
    <>
      <div className="sidebar__item -no-border">
        <h5 className="text-18 fw-500 mb-10">Search by name</h5>
        <SearchBox onFilterChange={onFilterChange} name={"vendor_name"} placeholder={"e.g. DJ Cretex"}/>
      </div>
      <div className="sidebar__item pb-30">
        <h5 className="text-18 fw-500 mb-10">Price</h5>
        <div className="row x-gap-10 y-gap-30">
          <div className="col-12">
          <div className="js-price-rangeSlider">
            <div className="text-14 fw-500"></div>

            <div className="d-flex justify-between mb-20">
              <div className="text-15 text-dark-1">
                <span className="js-lower mx-1">₹{rate.min || searchParams.vendor_rate.min}</span>-
                <span className="js-upper mx-1">₹{rate.max || searchParams.vendor_rate.max}</span>
              </div>
            </div>
            <div className="px-5">
              <InputRange
                formatLabel={(value) => ``}
                minValue={10000}
                step={1000}
                maxValue={1000000}
                value={rate}
                onChange={(value) => handleOnChange(value,"vendor_rate")}
              />
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
