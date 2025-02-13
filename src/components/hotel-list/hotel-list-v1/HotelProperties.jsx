import { hotelsData } from "../../../data/hotels";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import { json, Link } from "react-router-dom";
import { getSeoFriendlyURL } from "@/utils/DOMUtils";

const HotelProperties = ({venues = {data:[]}}) => {
  return (
    <>
      {venues !== null && venues.data.map((venue) => (
        <div className="col-12" key={venue?.venue_id}>
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
                        {JSON.parse(venue?.venue_images).length !== 0 && JSON.parse(venue?.venue_images).map((slide, i) => (
                          <SwiperSlide key={i}>
                            <img
                              className="rounded-4 col-12 js-lazy"
                              src={slide}
                              alt="image"
                              style={{height: "250px",
                                objectFit: "cover",
                                width: "250px",
                                objectPosition: "center"}}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                  {venue?.special_label && <div className="cardImage__leftBadge">
                    <div className={`py-5 px-15 rounded-right-4 text-12 lh-16 fw-500 uppercase bg-dark-1 text-white`} style={{width:"fit-content"}}>
                      {venue?.special_label}
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
                      to={`/venue/${getSeoFriendlyURL(venue.city_name)}/${getSeoFriendlyURL(venue.region_name)}/${getSeoFriendlyURL(venue.venue_name) + "-" +venue.venue_id}`}
                      className="text-dark-1 hover:underline"
                    >
                      {venue?.venue_name}
                      
                      <div className="row x-gap-10 y-gap-10 items-center pt-10">
                        <div className="col-auto">
                          <p className="text-14">{venue?.venue_address} </p>                    
                        </div>
                      </div>
                </Link>

                <button
                      data-x-click="mapFilter"
                      onClick={()=>{window.open(venue.venue_map_url, "_blank");}}
                      className="d-block text-14 text-blue-1 underline"
                    >
                      Show on map
                    </button>
                  
                  {/* <div className="d-inline-block ml-10">
                    <i className="icon-star text-10 text-yellow-2"></i>
                    <i className="icon-star text-10 text-yellow-2"></i>
                    <i className="icon-star text-10 text-yellow-2"></i>
                    <i className="icon-star text-10 text-yellow-2"></i>
                    <i className="icon-star text-10 text-yellow-2"></i>
                  </div> */}
                </h3>
                 
                <div className="text-14 d-flex text-green-2 lh-15 mt-10">
                  <div className=""> Vegetarian Package: </div><div className="fw-500"> &nbsp;<s>{` ₹${venue.veg_package_price}`}</s>/Plate</div>
                </div>
                <div className="text-14 d-flex lh-15" style={{color:"#639D49"}}>
                  <div className=""> Non-Vegetarian Package: </div><div className="fw-500"> &nbsp;<s>{` ₹${venue.non_veg_package_price}`}</s>/Plate</div>
                </div>
                <div className="row x-gap-10 y-gap-10 pt-20">

                  {JSON.parse(venue.venue_categories).slice(0,4).map((category)=>(
                    <div className="col-auto">
                      <div className={`py-5 px-15 mr-5 mt-5 text-12 lh-16 fw-500 uppercase text-white ${category.category_color_class}`} style={{backgroundColor: category.category_color_class, width: "fit-content",flex: "0 0 130px", borderRadius: "0 15px 15px 0",}}>
                        {category.category_name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* End .col-md */}

              <div className="col-md-auto text-right md:text-left">
                <div className="row x-gap-10 y-gap-10 justify-end items-center md:justify-start">
                  {/* <div className="col-auto">
                    <div className="d-inline-block ml-10">
                      <i className="icon-star text-10 text-yellow-2"></i>
                      <i className="icon-star text-10 text-yellow-2"></i>
                      <i className="icon-star text-10 text-yellow-2"></i>
                      <i className="icon-star text-10 text-yellow-2"></i>
                      <i className="icon-star text-10 text-yellow-2"></i>
                    </div>
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
                    Contact: {venue?.venue_phone_no}
                  </div>
                  <div className="text-22 lh-12 fw-600 mt-5">
                  Price/- <s>₹{venue?.venue_rate}</s>
                  </div>
                  <Link
                    state={venue}
                    to={`/venue/${venue.city_name}/${venue.region_name}/${getSeoFriendlyURL(venue.venue_name) + "-" +venue.venue_id}`}
                    className="button -md -dark-1 bg-blue-1 text-white mt-24"
                  >
                    See Availability{" "}
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
