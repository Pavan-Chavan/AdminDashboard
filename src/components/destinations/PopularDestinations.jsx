import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Scrollbar } from "swiper";
import { destinations2 } from "../../data/desinations";
import { isEmpty } from "lodash";

const PopularDestinations = ({cityData}) => {
  const navigate = useNavigate();
  const getCityImg = (item) => {
    const Images = item?.city_image && JSON.parse(item.city_image) || [];
    if (Images.length != 0) {
      return Images[0];
    } else {
      return "/img/destinations/1/maharashtra.jpg";
    }
  }

  return (
    <>
      <Swiper
        spaceBetween={30}
        className="overflow-visible"
        scrollbar={{
          el: ".js-popular-destination-scrollbar",
          draggable: true,
        }}
        modules={[Scrollbar, Navigation]}
        navigation={{
          nextEl: ".js-destination-next",
          prevEl: ".js-destination-prev",
        }}
        breakpoints={{
          500: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 22,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {cityData.map((item) => (
          <SwiperSlide key={item.city_id}>
            <Link
              to="#"
              className="citiesCard -type-1 d-block rounded-4"
              key={item.city_id}
            >
              <div className="citiesCard__image ratio ratio-3:4">
                <img src={getCityImg(item)} alt="image" className="js-lazy" />
              </div>
              <div className="citiesCard__content d-flex flex-column justify-between text-center pt-30 pb-20 px-20">
                <div className="citiesCard__bg" />
                <div className="citiesCard__top">
                  <div className="text-14 text-white"></div>
                </div>
                <div className="citiesCard__bottom">
                  <h4 className="text-26 md:text-20 lh-13 text-white mb-20">
                    {item.city_name}
                  </h4>
                  <div className="button-container d-flex justify-content-center gap-3">
                    {/* <button className="button col-6 h-60 -blue-1 bg-white text-dark-1" name={item.city_name} id={item.city_id} onClick={handleVenueClick}>
                      Venues
                    </button> */}
                    <Link
                      to={`/venues?city_name=${item.city_name}&city_id=${item.city_id}`}
                      className="button col-6 h-60 -blue-1 bg-white text-dark-1"
                    >Venues</Link>
                    <Link
                      to={`/vendors?city_name=${item.city_name}&city_id=${item.city_id}`}
                      className="button col-6 h-60 -blue-1 bg-white text-dark-1"
                    >Vendors</Link>
                  </div>
                  </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div>
        <button className="section-slider-nav  -prev flex-center button -blue-1 bg-white shadow-1 size-40 rounded-full sm:d-none js-destination-prev">
          <i className="icon icon-chevron-left text-12" />
        </button>
        <button className="section-slider-nav -next flex-center button -blue-1 bg-white shadow-1 size-40 rounded-full sm:d-none js-destination-next">
          <i className="icon icon-chevron-right text-12" />
        </button>
        <div className="slider-scrollbar bg-light-2 mt-40  js-popular-destination-scrollbar" />
      </div>
    </>
  );
};

export default PopularDestinations;
