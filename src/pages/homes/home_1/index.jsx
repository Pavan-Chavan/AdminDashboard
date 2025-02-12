import AddBanner from "@/components/add-banner/AddBanner";
import PopularDestinations from "@/components/destinations/PopularDestinations";
import DefaultFooter from "@/components/footer/default";
import Hero1 from "@/components/hero/hero-1";
import BlockGuide from "@/components/block/BlockGuide";
import Blog from "@/components/blog/Blog3";
import CallToActions from "@/components/common/CallToActions";
import Destinations from "@/components/home/home-1/Destinations";
import Testimonial from "@/components/home/home-1/Testimonial";
import TestimonialLeftCol from "@/components/home/home-1/TestimonialLeftCol";
import Hotels from "@/components/hotels/Hotels";
import SelectFilter from "@/components/hotels/filter-tabs/SelectFilter";
import axios from "axios";
import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/header/header-1";
import { useEffect, useState } from "react";
import { showAlert } from "@/utils/isTextMatched";
import { api } from "@/utils/apiProvider";
import { Line } from "react-chartjs-2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ServiceSlider from "@/components/hotels/ServiceSlider";

const metadata = {
  title: "WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};

const Home_1 = () => {
  const location = useLocation();
  
  const [cityData, setCityData] = useState([]);
  const [allCategories,setAllCategories] = useState([]);
  const [selectedCategory,setSelectedCategory] = useState("");
  const [services,setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const fetchCities = async () => {
    try {
      const response = await axios.get(`${api}/api/city/get-featured-city`);
      if (response.status == 200) {
        setCityData(response.data.result);
      } else {
        showAlert("Something went wrong","danger");
      }
    } catch (error) {
      showAlert("Something went wrong","danger");
    }
  }

  const fetchCategories = async () => {
    try {
        const response = await axios.get(`${api}/api/categories/get-categories`);
        if (response.data.success) {
          setAllCategories(response.data.results);
        }
    } catch (error) {
        console.log('failed to fetch the user');
        console.error(error);
    }
  };

  const fetchService = async () => {
    try {
        const response = await axios.get(`${api}/api/service/get-services`);
        if (response.data.success) {
          setServices(response.data.results);
        }
        
    } catch (error) {
        console.log('failed to fetch the user');
        console.error(error);
    }
  };

  const handleVenueFilter = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
  }

  const handleServiceFilter = (e) => {
    const value = e.target.value;
    setSelectedService(value);
  }
  const checkIfAuthenticated = async () => {
    try {
      const response = await axios.get(`${api}/auth/user`,{ withCredentials: true });
      if (response.status === 200) {
        const userRespose = await axios.get(`${api}/api/user/get-users/${response.data.id}`)
        if (userRespose.status === 200) {
          localStorage.setItem(`userId`,userRespose.data.user_id);
          localStorage.setItem("role",userRespose.data.role);
          localStorage.setItem("user-image",userRespose.data.image);
          localStorage.setItem("username",userRespose.data.name);
          setUserData(userRespose.data);
          navigate("/home");
        }
      }
    } catch (err) {
      showAlert("Something went wrong with google authentication, Please login again.")
      console.log(err);
    }
  }

  useEffect(()=>{
    const params = new URLSearchParams(location.search);
    if (params.get('GoogleAuthentication')) {
      checkIfAuthenticated();
    }
    fetchCities();
    fetchCategories();
    fetchService();
  },[])

  return (
    <>
      <MetaComponent meta={metadata} />
      {/* End Page Title */}

      <Header1 userData={userData}/>
      {/* End Header 1 */}

      <Hero1 />
      {/* End Hero 1 */}

      <section className="layout-pt-lg layout-pb-md" data-aos="fade-up">
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Popular Destinations</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  These popular destinations have a lot to offer
                </p>
              </div>
            </div>
            {/* End col-auto */}

            <div className="col-auto md:d-none">
            <Link
              to={`/venues`}
              className="button -md -blue-1 bg-blue-1-05 text-blue-1"
            >View All Destinations</Link>
            </div>
            {/* End col-auto */}
          </div>
          {/* End .row */}

          <div className="relative pt-40 sm:pt-20">
            <PopularDestinations cityData={cityData}/>
          </div>
        </div>
        {/* End .container */}
      </section>
      {/* End Popular Destinations */}

      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row y-gap-20">
            <AddBanner />
          </div>
        </div>
        {/* End .container */}
      </section>
      {/* End AddBanner */}

      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row y-gap-10 justify-between items-end">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Recommended Venue</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                Discover the Perfect Venue for Your Dream Wedding
                </p>
              </div>
            </div>
            <div className="col-sm-auto">
              <SelectFilter allCategories={allCategories} handleVenueFilter={handleVenueFilter}/>
            </div>
          </div>
          {/* End .row */}

          <div className="relative overflow-hidden pt-40 sm:pt-20 js-section-slider item_gap-x30">
            <Hotels selectedCategory={selectedCategory}/>
          </div>
          {/* End relative */}
        </div>
      </section>
      {/* Recommended Properties */}

      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row y-gap-10 justify-between items-end">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Recommended Service</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                Top-Quality Services to Make Your Wedding Unforgettable
                </p>
              </div>
            </div>
            <div className="col-sm-auto">
            <select className="form-select rounded-4 border-light justify-between text-16 fw-500 px-20 h-50 w-140 sm:w-full text-14" onChange={handleServiceFilter}>
              <option defaultValue value={""}>All Services</option>
                {services && services.map((service)=>{
                  return <option value={service.service_name}>{service.service_name}</option>
                })}
              </select>
            </div>
          </div>
          {/* End .row */}

          <div className="relative overflow-hidden pt-40 sm:pt-20 js-section-slider item_gap-x30">
            <ServiceSlider selectedService={selectedService}/>
          </div>
          {/* End relative */}
        </div>
      </section>
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-20 justify-between">
            <BlockGuide />
          </div>
        </div>
      </section>
      {/* Block Guide Section */}

      <section className="layout-pt-lg layout-pb-lg bg-blue-2">
        <div className="container">
          <div className="row y-gap-40 justify-between">
            <div className="col-xl-5 col-lg-6" data-aos="fade-up">
              <TestimonialLeftCol />
            </div>
            {/* End col */}

            <div className="col-lg-6">
              <div
                className="overflow-hidden js-testimonials-slider-3"
                data-aos="fade-up"
                data-aos-delay="50"
              >
                <Testimonial />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End container */}
      </section>
      {/* End testimonial Section */}

      <section className="layout-pt-lg layout-pb-md">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  Wedding Inspiration & Expert Tips
                </h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                Stay Updated with the Latest Trends, Planning Advice, and Expert Insights for Your Big Day.
                </p>
              </div>
            </div>
          </div>
          {/* End .row  */}
          <div className="row y-gap-30 pt-40">
            <Blog />
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End blog Section */}
      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
      {/* End Footer Section */}
    </>
  );
};

export default Home_1;
