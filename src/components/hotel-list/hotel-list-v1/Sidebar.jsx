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

const Sidebar = ({onFilterChange, searchParams, allCategories, handleCategoryDropDownChange}) => {
  const [capacity, setCapacity] = useState({ min: searchParams.venue_rate.min, max: searchParams.venue_rate.max });
  const [vegPlatePrice, setVegPlatePrice] = useState({ min: searchParams.veg_package_price.min, max: searchParams.veg_package_price.max });
  const [nonVegPlatePrice, setNonVegPlatePrice] = useState({ min: searchParams.non_veg_package_price.min, max: searchParams.non_veg_package_price.max });

  const handleOnChange = (value) => {
    setCapacity(value);
    onFilterChange(value,"venue_rate");
  };

  const renderSelectedCategory = () => {
    return searchParams.venue_categories.length === 0 ? "Select Categories" : searchParams.venue_categories.map((category) => {
      return (
        <div className={`py-5 px-15 mr-5 mt-5 rounded-right-4 text-12 lh-16 fw-500 uppercase text-white`} style={{width:"fit-content", backgroundColor: "#d13535", flex: "0 0 130px"}}>
          {category}
        </div>
      )
    })
  }

  const handleVegPlatePriceChange = (value) => {
    setVegPlatePrice(value);
    onFilterChange(value,"veg_package_price");
  };

  const handleNonVegPlatePriceChange = (value) => {
    setNonVegPlatePrice(value);
    onFilterChange(value,"non_veg_package_price");
  };

  return (
    <>
      <div className="sidebar__item -no-border">
        <h5 className="text-18 fw-500 mb-10">Search by property name</h5>
        <SearchBox onFilterChange={onFilterChange} name="venue_name" placeholder="e.g. Vivanta by Taj"/>
      </div>
      <div className="col-12">
        <div className="form-input" style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "8px" }}>
          <div className="dropdown js-dropdown js-services-active w-100">
            <div
              className="dropdown__button d-flex items-center justify-between bg-white rounded-4 w-100 text-14 px-20 text-14"
              data-bs-toggle="dropdown"
              style={{height:"auto"}}
              data-bs-auto-close="true"
              aria-expanded="false"
              data-bs-offset="0,10"
            >
              <span className="d-flex js-dropdown-title" style={{flexWrap:"wrap", overflow:"hidden"}}>{renderSelectedCategory()}</span>
              <i className="icon icon-chevron-sm-down text-7 ml-10" />
            </div>
            <div className="toggle-element -dropdown w-100 dropdown-menu">
              <div className="text-14 y-gap-15 js-dropdown-list">
              {allCategories.map((category, index) => (
                <div
                key={index}
                id={category.category_id}
                className={`${
                  searchParams?.venue_categories?.some(selectedCategory => category.category_name === selectedCategory) ? "text-blue-1" : ""
                } js-dropdown-link`}
                onClick={()=>{handleCategoryDropDownChange(category)}}
                >
                {category.category_name}
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar__item pb-30">
        <h5 className="text-18 fw-500 mb-10">Capacity</h5>
        <div className="row x-gap-10 y-gap-30">
          <div className="col-12">
          <div className="js-price-rangeSlider">
            <div className="text-14 fw-500"></div>

            <div className="d-flex justify-between mb-20">
              <div className="text-15 text-dark-1">
                <span className="js-lower mx-1">{capacity.min || searchParams.venue_rate.min}</span>-
                <span className="js-upper mx-1">{capacity.max || searchParams.venue_rate.max}</span>
              </div>
            </div>
            <div className="px-5">
              <InputRange
                formatLabel={(value) => ``}
                minValue={0}
                step={100}
                maxValue={2000}
                value={capacity || searchParams.venue_rate}
                onChange={(value) => handleOnChange(value,"venue_rate")}
              />
            </div>
          </div>
          </div>
        </div>
      </div>

      <div className="sidebar__item pb-30">
        <h5 className="text-18 fw-500 mb-10">Veg Plate Price</h5>
        <div className="row x-gap-10 y-gap-30">
          <div className="col-12">
          <div className="js-price-rangeSlider">
            <div className="text-14 fw-500"></div>

            <div className="d-flex justify-between mb-20">
              <div className="text-15 text-dark-1">
                <span className="js-lower mx-1">{vegPlatePrice.min || searchParams.veg_package_price.min}</span>-
                <span className="js-upper mx-1">{vegPlatePrice.max || searchParams.veg_package_price.max}</span>
              </div>
            </div>
            <div className="px-5">
              <InputRange
                formatLabel={(value) => ``}
                minValue={0}
                step={100}
                maxValue={2000}
                value={vegPlatePrice || searchParams.veg_package_price}
                onChange={(value) => handleVegPlatePriceChange(value)}
              />
            </div>
          </div>
          </div>
        </div>
      </div>

      <div className="sidebar__item pb-30">
        <h5 className="text-18 fw-500 mb-10">Non-Veg Plate Price</h5>
        <div className="row x-gap-10 y-gap-30">
          <div className="col-12">
          <div className="js-price-rangeSlider">
            <div className="text-14 fw-500"></div>

            <div className="d-flex justify-between mb-20">
              <div className="text-15 text-dark-1">
                <span className="js-lower mx-1">{nonVegPlatePrice.min || searchParams.non_veg_package_price.min}</span>-
                <span className="js-upper mx-1">{nonVegPlatePrice.max || searchParams.non_veg_package_price.max}</span>
              </div>
            </div>
            <div className="px-5">
              <InputRange
                formatLabel={(value) => ``}
                minValue={0}
                step={100}
                maxValue={2000}
                value={nonVegPlatePrice || searchParams.non_veg_package_price}
                onChange={(value) => handleNonVegPlatePriceChange(value)}
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
