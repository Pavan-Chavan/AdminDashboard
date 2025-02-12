import { Link } from "react-router-dom";

import {
  homeItems,
} from "../../data/mainMenuData";
import {
  isActiveParentChaild,
} from "../../utils/linkActiveChecker";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const MainMenu = ({ style = "" , staticHeader}) => {
  const { pathname } = useLocation();
  const [isActiveParent, setIsActiveParent] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(()=>{
    if (localStorage.getItem("userId") !== null) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  })

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return (
    <nav className="menu js-navList">
      <ul className={`menu__nav ${style} -is-active`}>
      <li
          className={`${ isActiveParentChaild(homeItems, pathname) ? "current" : "" } menu-item-has-children`}
        > 
          <Link to="/">
            <span className={`mr-10 ${pathname === "/" ? "current" : navbar || staticHeader ? "text-black" : ""}`}>Home</span>
          </Link>
        </li>
        {/* End home page menu */}

        <li className={pathname === "/destinations" ? "current" : ""}>
          <Link to="/destinations"><span className={`mr-10 ${pathname === "/destinations" ? "current" : navbar || staticHeader ? "text-black" : ""}`}>Destinations</span></Link>
        </li>
        {/* End Destinatinos single menu */}
        {isUserLoggedIn && <li className={pathname === "/booking" ? "current" : ""}>
          <Link to="/booking"><span className={`mr-10 ${pathname === "/booking" ? "current" : navbar || staticHeader ? "text-black" : ""}`}>Bookings</span></Link>
        </li>}

        <li className={pathname === "/about" ? "current" : ""}>
          <Link to="/about"><span className={`mr-10 ${pathname === "/about" ? "current" : navbar || staticHeader ? "text-black" : ""}`}>About</span></Link>
        </li>
        
        <li className={pathname === "/contact" ? "current" : ""}>
          <Link to="/contact"><span className={`mr-10 ${pathname === "/contact" ? "current" : navbar || staticHeader ? "text-black" : ""}`}>Contact</span></Link>
        </li>        

        {/* <li
          className={`${
            isActiveParentChaild(pageItems, pathname) ? "current" : ""
          } menu-item-has-children`}
        >
          <a href="#">
            <span className={`mr-10 ${navbar || staticHeader ? "text-black" : "" }`}>Pages</span>
            <i className={`icon icon-chevron-sm-down ${navbar || staticHeader ? "text-black" : "" }`}/>
          </a>
          <ul className="subnav">
            {pageItems.map((menu, i) => (
              <li
                key={i}
                className={
                  isActiveLink(menu.routePath, pathname) ? "current" : ""
                }
              >
                <Link to={menu.routePath}>{menu.name}</Link>
              </li>
            ))}
          </ul>
        </li> */}
        {/* End pages items */}

        {/* <li
          className={`${
            pathname.split("/")[1] == "dashboard" ||
            pathname.split("/")[1] == "vendor-dashboard"
              ? "current"
              : ""
          } menu-item-has-children`}
        >
          <a href="#">
            <span className={`mr-10 ${navbar || staticHeader ? "text-black" : "" }`}>Dashboard</span>
            <i className={`icon icon-chevron-sm-down ${navbar || staticHeader ? "text-black" : "" }`} />
          </a>
          <ul className="subnav ">
            {dashboardItems.map((menu, i) => (
              <li
                key={i}
                className={
                  isActiveLink(menu.routePath, pathname) ? "current" : ""
                }
              >
                <Link to={menu.routePath}>{menu.name}</Link>
              </li>
            ))}
          </ul>
        </li> */}

        
      </ul>
    </nav>
  );
};

export default MainMenu;
