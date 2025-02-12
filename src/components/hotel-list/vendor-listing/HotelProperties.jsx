import { hotelsData } from "../../../data/hotels";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import { json, Link } from "react-router-dom";
import { getSeoFriendlyURL } from "@/utils/DOMUtils";

const HotelProperties = ({vendors}) => {
  return (
    <>
      {vendors !== null && vendors.data.map((vendor) => (
        <div className="col-12" key={vendor?.vendor_id}>
          <div className="border-top-light pt-30">
            <div className="row x-gap-20 y-gap-20">
              <div className="col-md-auto">
                <div className="cardImage ratio ratio-1:1 w-250 md:w-1/1 rounded-4">
                  <div className="cardImage__content">
                    <div className="cardImage-slider rounded-4  custom_inside-slider">
                      <Swiper
                        className="mySwiper"
                        modules={[Pagination, Navigation]}
                        pagination={{
                          clickable: true,
                        }}
                        navigation={true}
                      >
                        {JSON.parse(vendor?.portfolio).length !== 0 && JSON.parse(vendor?.portfolio).map((slide, i) => (
                          <SwiperSlide key={i}>
                            <img
                              className="rounded-4 col-12 js-lazy"
                              src={slide}
                              alt="image"
                              style={{height: "225px",
                                objectFit: "cover",
                                width: "250px",
                                objectPosition: "center"}}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                  {vendor?.special_label && <div className="cardImage__leftBadge">
                    <div className={`py-5 px-15 rounded-right-4 text-12 lh-16 fw-500 uppercase bg-dark-1 text-white`} style={{width:"fit-content"}}>
                      {vendor?.special_label}
                    </div>
                  </div>}
                  {/* End image */}

                  <div className="cardImage__wishlist">
                    <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                      <i className="icon-heart text-12"></i>
                    </button>
                  </div>
                </div>
              </div>
              {/* End .col */}

              <div className="col-md">
                <h3 className="text-18 lh-16 fw-500">                  
                  <Link
                      to={`/vendor/${getSeoFriendlyURL(vendor.city_name)}/${getSeoFriendlyURL(vendor.region_name)}/${getSeoFriendlyURL(vendor.vendor_name) + "-" +vendor.service_reg_id}`}
                      className="text-dark-1 hover:underline"
                    >
                      {vendor?.vendor_name}
                      
                      <div className="row x-gap-10 y-gap-10 items-center pt-10">
                        <div className="col-auto">
                          <p className="text-14">{vendor?.vendor_address}</p>                    
                        </div>
                      </div>
                </Link>

                  {/* <br className="lg:d-none" /> {vendor?.vendor_address} */}
                  {/* <div className="d-inline-block ml-10">
                    <i className="icon-star text-10 text-yellow-2"></i>
                    <i className="icon-star text-10 text-yellow-2"></i>
                    <i className="icon-star text-10 text-yellow-2"></i>
                    <i className="icon-star text-10 text-yellow-2"></i>
                    <i className="icon-star text-10 text-yellow-2"></i>
                  </div> */}
                </h3>

                <div className="row x-gap-10 y-gap-10 items-center pt-10">
                  <div className="col-auto">
                    <button
                      data-x-click="mapFilter"
                      onClick={()=>{window.open(vendor.maplink, "_blank");}}
                      className="d-block text-14 text-blue-1 underline"
                    >
                      Show on map
                    </button>
                  </div>
                </div>
                {/* <div className="text-14 lh-15 d-flex mt-20">
                  <div className="fw-500 mr-5">Check out our website</div>
                   <div className="col-auto">
                    <button
                      data-x-click="mapFilter"
                      onClick={()=>{window.open(vendor.website, "_blank");}}
                      className="d-block text-14 text-blue-1 underline"
                    >
                      Explore Now
                    </button>
                  </div>
                </div> */}
                {/* <div className="text-14 d-flex lh-15" style={{color:"#d13535"}}>
                  <div className="">Package: </div><div className="fw-500">{` ₹${vendor.vendor_rate}`}</div>
                </div> */}
                <div className="row x-gap-10 y-gap-10 pt-20">
                  <div className="col-auto">
                      <div className={`py-5 px-15 mr-5 mt-5 text-12 lh-16 fw-500 uppercase text-white bg-yellow-1`} style={{width:"fit-content", backgroundColor: "#d13535", flex: "0 0 130px", borderRadius: "0 15px 15px 0"}}>
                        {vendor?.vendor_service}
                      </div>
                    </div>
                </div>
              </div>
              {/* End .col-md */}

              <div className="col-md-auto text-right md:text-left d-flex items-center">
                <div className="row x-gap-10 y-gap-10 justify-end items-center md:justify-start">
                  {/* <div className="col-auto">
                    <div className="text-14 lh-14 fw-500">Exceptional</div>
                    <div className="text-14 lh-14 text-light-1">
                      3,014 reviews
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="flex-center text-white fw-600 text-14 size-40 rounded-4 bg-blue-1">
                      {"3.7"}
                    </div>
                  </div> */}
                </div>

                <div className="">
                  <div className="text-14 text-light-1 mt-50 md:mt-20">
                    Contact: {vendor?.contact_number}
                  </div>
                  <div className="text-18 lh-12 fw-500 mt-5">
                  {vendor?.vendor_service} Package Price: <s>₹{vendor?.vendor_rate}</s>
                  </div>
                    <Link
                      state={vendor}
                      to={`/vendor/${getSeoFriendlyURL(vendor.city_name)}/${getSeoFriendlyURL(vendor.region_name)}/${getSeoFriendlyURL(vendor.vendor_name) + "-" +vendor.service_reg_id}`}
                      className="button -md -dark-1 bg-blue-1 text-white mt-24"
                    >
                      Send Enquiry{" "}
                      <div className="icon-arrow-top-right ml-15"></div>
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default HotelProperties;
