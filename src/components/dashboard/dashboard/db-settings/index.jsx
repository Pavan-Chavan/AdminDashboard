import Sidebar from "../common/Sidebar";
import AdminSidebar from "../../admin-dashboard/common/Sidebar";
import Header from "../../../header/dashboard-header";
import SettingsTabs from "./components/index";
import Footer from "../common/Footer";
import { useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { isUserLoggedIn } from "@/utils/DOMUtils";

const index = () => {
  return (
    <>
      {/*  */}
      {/* End Page Title */}

      <div className="header-margin"></div>

      <Header />
      {/* End dashboard-header */}

      <div className="dashboard">
        <div className="dashboard__sidebar bg-white scroll-bar-1">
          {isUserLoggedIn() ? <Sidebar />  : <AdminSidebar/>}
          {/* End sidebar */}
        </div>
        {/* End dashboard__sidebar */}

        <div className="dashboard__main">
          <div className="dashboard__content bg-light-2">
            <div className="row y-gap-20 justify-between items-end pb-60 lg:pb-40 md:pb-32">
              <div className="col-12">
                <h1 className="text-30 lh-14 fw-600">Settings</h1>
                <div className="text-15 text-light-1">
                  Make changes into your profile.
                </div>
              </div>
              {/* End .col-12 */}
            </div>
            {/* End .row */}

            <div className="py-30 px-30 rounded-4 bg-white shadow-3">
              <SettingsTabs />
            </div>

            <Footer />
          </div>
          {/* End .dashboard__content */}
        </div>
        {/* End dashbaord content */}
      </div>
      {/* End dashbaord content */}
    </>
  );
};

export default index;
