import HotelContent from "./content/HotelContent";
import HotelPolicy from "./content/HotelPolicy";
import BannerUploader from "./content/BannerUploader";
import FeaturedUploader from "./content/FeaturedUploader";
import GalleryUploader from "./content/GalleryUploader";
import { useEffect, useState } from "react";
import RegionSearch from "@/components/hero/hero-1/RegionSearch";
import LocationSearch from "@/components/hero/hero-1/LocationSearch";
import axios from 'axios';
import { api } from "@/utils/apiProvider";
import { showAlert } from "@/utils/isTextMatched";
import { debounce } from "@/utils/DOMUtils";

const AdministrativeControl = ({ blogpostdata = {}, handleChange = () => {}, handleDropDownChange, handleCheckBox }) => {
 
  return (
    <>
      <div className="col-xl-10">
        <div className="row x-gap-20 y-gap-20">

          <div className="col-12">
            <div className="d-flex">
              <div className="form-input" style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "8px" }}>
                <div className="dropdown js-dropdown js-services-active w-100">
                  <div
                    className="dropdown__button d-flex items-center justify-between bg-white rounded-4 w-100 text-14 px-20 h-50 text-14"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="true"
                    aria-expanded="false"
                    data-bs-offset="0,10"
                  >
                    <input
                      type="text"
                      readOnly
                      value={blogpostdata.is_enable ? "Publish" : "Draft"}
                      className="js-search js-dd-focus"
                      style={{
                        marginTop: "-20px",
                        border: "none",
                        position: "relative",
                        top: "13px",
                        left: "-29px",
                        backgroundColor: "transparent"
                      }}
                    />
                    <label className="lh-1 text-16 text-light-1" style={{ left: "-10px", top: "8px" }}>Status</label>
                    <i className="icon icon-chevron-sm-down text-7 ml-10" />
                  </div>
                  <div className="toggle-element -dropdown w-100 dropdown-menu">
                    <div className="text-14 y-gap-15 js-dropdown-list">
                      <div
                        className={`js-dropdown-link ${blogpostdata.is_enable ? "text-blue-1" : ""}`}
                        onClick={() => {
                          handleCheckBox({ name: "is_enable", value: true });
                        }}
                      >
                        <div className="ml-10">
                          <div className="text-15 lh-12 fw-500 js-search-option-target">
                            Publish
                          </div>
                        </div>
                      </div>
                      <div
                        className={`js-dropdown-link ${!blogpostdata.is_enable ? "text-blue-1" : ""}`}
                        onClick={() => {
                          handleCheckBox({ name: "is_enable", value: false });
                        }}
                      >
                        <div className="ml-10">
                          <div className="text-15 lh-12 fw-500 js-search-option-target">
                            Draft
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default AdministrativeControl;
