import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import MainMenu from "../MainMenu";
import MobileMenu from "../MobileMenu";
import { isLoggedInUser } from "@/utils/DOMUtils";
import axios from 'axios';
import { api } from "@/utils/apiProvider";
import { showAlert } from "@/utils/isTextMatched";

const Header1 = ({ staticHeader, userData = {} }) => {
  const [navbar, setNavbar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Ref for dropdown

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    setIsLoggedIn(isLoggedInUser());
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, [userData]);

  const getUserImage = () => {
    const userImage = localStorage.getItem("user-image");
    return userImage ? JSON.parse(userImage) : "/img/avatars/3.png";
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const logout = async () => {
    localStorage.clear();
    setIsLoggedIn(false);
    try {
      const response = await axios.get(`${api}/auth/logout`);
      if (response.status === 200) {
        showAlert("Logged out !!!","success");
      }
    } catch (error) {
      
    }
    navigate("/");
  };

  return (
    <>
      <header className={`header ${navbar ? "bg-dark-1 is-sticky" : ""}`}>
        <div className="header__container px-30 sm:px-20">
          <div className="row justify-between items-center">
            <div className="col-auto">
              <div className="d-flex items-center">
                <Link to="/" className="header-logo mr-20">
                  {navbar || staticHeader ? (
                    <img src="/img/general/logo-dark.svg" alt="logo icon" />
                  ) : (
                    <img src="/img/general/logo-light.svg" alt="logo icon" />
                  )}
                </Link>

                <div className="header-menu">
                  <div className="header-menu__content">
                    <MainMenu style="text-white" staticHeader={staticHeader} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex items-center">
                {!isLoggedIn && (
                  <div className="d-flex items-center ml-20 is-menu-opened-hide md:d-none">
                    <Link
                      to="/login"
                      className="button px-40 fw-400 text-14 -white bg-blue-1 h-50 text-white"
                    >
                      Log In / Register
                    </Link>
                    <Link to="/become-expert" className="-white h-50 ">
                      <span
                        className={`button px-30 fw-400 text-14  h-50  ml-20 ${
                          navbar || staticHeader
                            ? "--color-black  border-black"
                            : "border-white -outline-white text-white"
                        }`}
                      >
                        List Your Business
                      </span>
                    </Link>
                  </div>
                )}

                {isLoggedIn && (
                  <div
                    className="d-flex items-center ml-20 is-menu-opened-hide md:d-none"
                    ref={dropdownRef}
                  >
                    <div
                      className="position-relative"
                      style={{ cursor: "pointer" }}
                      onClick={() => setDropdownVisible(!dropdownVisible)}
                    >
                      <img
                        src={getUserImage()}
                        alt="image"
                        className="size-35 rounded-22 object-cover"
                      />
                      <div
                        className="dropdown-menu position-absolute bg-white shadow rounded-4"
                        style={{
                          top: "100%",
                          right: 0,
                          width: "180px",
                          display: dropdownVisible ? "block" : "none",
                          zIndex: 100,
                        }}
                      
                      >
                        <Link
                          to={
                            ["admin", "vendor-user", "venue-user"].includes(
                              userRole
                            )
                              ? "/admin-dashboard/dashboard"
                              : "/dashboard/db-dashboard"
                          }
                          className="d-block px-15 py-10 text-14 text-dark hover:bg-light-2"
                          style={{ textDecoration: "none" }}
                        >
                          <img
                            src="/img/dashboard/sidebar/compass.svg"
                            alt="dashboard-icon"
                            style={{
                              width: "16px",
                              height: "16px",
                              marginRight: "8px",
                            }}
                          />
                          Dashboard
                        </Link>
                        <Link
                          to={
                            ["admin", "vendor-user", "venue-user"].includes(
                              userRole
                            )
                              ? "/admin-dashboard/settings"
                              : "/dashboard/db-settings"
                          }
                          className="d-block px-15 py-10 text-14 text-dark hover:bg-light-2"
                          style={{ textDecoration: "none" }}
                        >
                          <img
                            src="/img/dashboard/sidebar/gear.svg"
                            alt="settings-icon"
                            style={{
                              width: "16px",
                              height: "16px",
                              marginRight: "8px",
                            }}
                          />
                          Profile
                        </Link>
                        <div
                          onClick={logout}
                          className="d-flex items-center px-15 py-10 text-14 text-dark hover:bg-light-2"
                          style={{
                            cursor: "pointer",
                            textDecoration: "none",
                          }}
                        >
                          <img
                            src="/img/dashboard/sidebar/log-out.svg"
                            alt="logout-icon"
                            style={{
                              width: "16px",
                              height: "16px",
                              marginRight: "8px",
                            }}
                          />
                          Logout
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="d-none xl:d-flex x-gap-20 items-center pl-30 text-white">
                  {!isLoggedIn && (
                    <div>
                      <Link
                        to="/login"
                        className="d-flex items-center icon-user text-inherit text-22"
                      />
                    </div>
                  )}
                  <div>
                    <button
                      className="d-flex items-center icon-menu text-inherit text-20"
                      data-bs-toggle="offcanvas"
                      aria-controls="mobile-sidebar_menu"
                      data-bs-target="#mobile-sidebar_menu"
                    />

                    <div
                      className="offcanvas offcanvas-start  mobile_menu-contnet "
                      tabIndex="-1"
                      id="mobile-sidebar_menu"
                      aria-labelledby="offcanvasMenuLabel"
                      data-bs-scroll="true"
                    >
                      <MobileMenu />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header1;
