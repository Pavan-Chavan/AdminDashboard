import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import axios from "axios";
import { api } from "@/utils/apiProvider";
import isTextMatched, { showAlert } from "../../utils/isTextMatched";
import { getSeoFriendlyURL } from "@/utils/DOMUtils";

const ServiceSlider = ({selectedService}) => {
  const [featuredService, setFeaturedService] = useState([]);
  const [featuredFilterService, setFeaturedFilterService] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImageSrc = (item) => {
    return item.portfolio
      ? JSON.parse(item.portfolio)[0]
      : "/img/destinations/1/maharashtra.jpg";
  };

  useEffect(()=>{
    if (selectedService === "") {
      setFeaturedFilterService(featuredService);
    } else {    
      setFeaturedFilterService(featuredService.filter((vendor) => {return vendor.vendor_service === selectedService}))
    }
  },[selectedService])

  useEffect(() => {
    // Fetch featured venues
    const fetchFeaturedService = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${api}/api/vendor/get-feature-vendors`);
        if (response.data.success) {
          setFeaturedService(response.data.results);
          setFeaturedFilterService(response.data.results);
        } else {
          showAlert("Something went wrong","danger");
          console.error("Failed to fetch featured venues.");
        }
      } catch (err) {
        showAlert("Something went wrong","danger");
        console.error("Error fetching featured venues:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedService();
  }, []);

  if (loading) return <p>Loading featured services...</p>;
  if (featuredFilterService.length === 0) return <p>No featured Services available.</p>;

  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".js-hotels-next",
          prevEl: ".js-hotels-prev",
        }}
        pagination={{
          el: ".js-hotels-pag",
          clickable: true,
        }}
        breakpoints={{
          540: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 22 },
          1024: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
      >
        {featuredFilterService.map((item) => (
          <SwiperSlide key={item?.service_reg_id}>
            <Link
              to={`/vendor/${getSeoFriendlyURL(item.city_name)}/${getSeoFriendlyURL(item.region_name)}/${getSeoFriendlyURL(item.vendor_name) + "-" +item.service_reg_id}`}
              className="hotelsCard -type-1 hover-inside-slider"
              data-aos="fade"
              data-aos-delay={item?.delayAnimation}
            >
              <div className="hotelsCard__image">
                <div className="cardImage ratio ratio-1:1">
                  <div className="cardImage__content">
                    <img
                      className="rounded-4 col-12 js-lazy"
                      src={getImageSrc(item)}
                      alt="Venue Image"
                    />
                  </div>
                </div>
                <div className="cardImage__wishlist">
                  <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                    <i className="icon-heart text-12" />
                  </button>
                </div>
              </div>
              {item.special_label && <div className="cardImage__leftBadge">
                <div className={`py-5 px-15 rounded-right-4 text-12 lh-16 fw-500 uppercase bg-dark-1 text-white`} style={{width:"fit-content"}}>
                  {item.special_label}
                </div>
              </div>}
              <div className="hotelsCard__content mt-10">
                <h4 className="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
                  <span>{item?.vendor_name}</span>
                </h4>
                <p className="text-light-1 lh-14 text-14 mt-5">
                  {item?.city_name}, {item?.region_name}
                </p>
                <div className="mt-5">
                  <div className="fw-500">
                    Starting from{" "}
                    <span className="text-blue-1">₹{item?.vendor_rate}</span>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="d-flex x-gap-15 items-center justify-center sm:justify-start pt-40 sm:pt-20">
        <div className="col-auto">
          <button className="d-flex items-center text-24 arrow-left-hover js-hotels-prev">
            <i className="icon icon-arrow-left" />
          </button>
        </div>

        <div className="col-auto">
          <div className="pagination -dots text-border js-hotels-pag" />
        </div>

        <div className="col-auto">
          <button className="d-flex items-center text-24 arrow-right-hover js-hotels-next">
            <i className="icon icon-arrow-right" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ServiceSlider;