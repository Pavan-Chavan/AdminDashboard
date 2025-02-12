import { useEffect, useState } from "react";
import AppButton from "./AppButton";
import ContactInfo from "./ContactInfo";
import Copyright from "./Copyright";
import FooterContent from "./FooterContent";
import axios from 'axios';
import { api } from "@/utils/apiProvider";
import { showAlert } from "@/utils/isTextMatched";
import footerDataContent from "../../../data/footerContent";
import { transformDataForCategory, transformDataForCity, transformDataForCityAndCategory } from "@/utils/JSXUtils";

const index = ({footerType="both"}) => {
  const [footerData, setFooterData] = useState({});
  const fetchFooterdate = async () => {
    try {
      const response = await axios.get(`${api}/api/footer/get-footer`, {
        params : {footerType}
      });
      if (response.status === 200) {
        if (footerType === "vendor") {
          setFooterData(transformDataForCategory(response.data));
        } else if (footerType === "venue") {        
          setFooterData(transformDataForCity(response.data));
        } else {
          setFooterData(transformDataForCityAndCategory(response.data));
        }
      } else {
        showAlert("Something went wrong here");
      }
    } catch (error) {
      showAlert(error?.response?.data?.error || "Something went wrong");
    }
  }
  
  useEffect(()=>{
    fetchFooterdate();
  },[])
  return (
    <>
    <footer className="footer -type-1">
      <div className="container">
        <div className="pt-60 pb-60">
          <div className="row y-gap-40 justify-between xl:justify-start">
            <FooterContent footerDataContent={footerData}/>
          </div>
        </div>
      </div>
      {/* End container */}
    </footer>
    <footer className="footer -type-1">
      <div className="container">
        <div className="pt-60 pb-60">
          <div className="row y-gap-40 justify-between xl:justify-start">
            <div className="col-xl-2 col-lg-4 col-sm-6">
              <h5 className="text-16 fw-500 mb-30">Contact Us</h5>
              <ContactInfo />
            </div>
            {/* End col */}

            <FooterContent footerDataContent={footerDataContent}/>
            {/* End footer menu content */}

            <div className="col-xl-2 col-lg-4 col-sm-6">
              <h5 className="text-16 fw-500 mb-30">Mobile</h5>
              <AppButton />
            </div>
          </div>
        </div>
        {/* End footer top */}

        <div className="py-20 border-top-light">
          <Copyright />
        </div>
        {/* End footer-copyright */}
      </div>
      {/* End container */}
    </footer>
    </>
  );
};

export default index;
