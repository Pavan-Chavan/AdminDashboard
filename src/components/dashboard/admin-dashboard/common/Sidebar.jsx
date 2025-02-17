import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../../styles/modals.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState();

  const sidebarData = [
    {
      icon: "/img/dashboard/sidebar/gear.svg",
      title: "Posts",
      allowedRole: ["admin"],
      links: [
        { title: "All Posts", href: "/", allowedRole: ["admin"] },
        { title: "Add New Post", href: "/", allowedRole: ["admin"] },
        { title: "Categories", href: "categories", allowedRole: ["admin"] },
        { title: "Tags", href: "/", allowedRole: ["admin"] },
      ],
    },
    {
      icon: "/img/dashboard/sidebar/gear.svg",
      title: "BajarBhav data pulling",
      href: "bhajarbhav-pulling"
    },
    {
      icon: "/img/dashboard/sidebar/house.svg",
      title: "Blog Posts",
      links: [
        { title: "All Blogs", href: "blog-posts"},
        { title: "Add Blogs", href: "blog-posts/add"},
      ],
    },
    {
      icon: "/img/dashboard/sidebar/gear.svg",
      title: "Settings",
      href: "settings",
      allowedRole: ["admin", "venue-user", "vendor-user"],
    }
  ];

  useEffect(() => {
    const currentUrl = window.location.href;
    const regex = /admin-dashboard\/(.+)/;
    const match = currentUrl.match(regex);
    if (match && match[1]) {
      setTab(match[1]);
    } else {
      setTab("No match found");
    }
  }, []);

  const handleRoute = (path, newTab) => {
    setTab(newTab);
    navigate(path);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="sidebar -dashboard" id="vendorSidebarMenu">
      {/* Static Items */}
      <div className="sidebar__item">
        <a
          onClick={() => handleRoute("/admin-dashboard/dashboard", "dashboard")}
          className={`${tab === "dashboard" ? "side_current" : ""} cursor sidebar__button d-flex items-center text-15 lh-1 fw-500`}
        >
          <img src="/img/dashboard/sidebar/compass.svg" alt="image" className="mr-15" />
          Dashboard
        </a>
      </div>

      {/* <div className="sidebar__item">
        <a
          onClick={() => handleRoute("/admin-dashboard/booking", "Booking Manager")}
          className={`${tab === "Booking Manager" ? "side_current" : ""} cursor sidebar__button d-flex items-center text-15 lh-1 fw-500`}
        >
          <img src="/img/dashboard/sidebar/booking.svg" alt="image" className="mr-15" />
          Booking Manager
        </a>
      </div> */}

      {sidebarData.map((item, index) => {
        if (item.links) {
          // Render dropdown items like Venues and Vendors
          return (
            (
              <div className="sidebar__item" key={index}>
                <div className="accordion -db-sidebar js-accordion">
                  <div className="accordion__item">
                    <div
                      className={`accordion__button ${
                        item.links.some((link) => tab === link.href) ? "side_current" : ""
                      }`}
                      data-bs-toggle="collapse"
                      data-bs-target={`#sidebarItem${index}`}
                    >
                      <div className="sidebar__button col-12 d-flex items-center justify-between">
                        <div className="d-flex items-center text-15 lh-1 fw-500">
                          <img src={item.icon} alt="image" className="mr-10" />
                          {item.title}
                        </div>
                        <div className="icon-chevron-sm-down text-7" />
                      </div>
                    </div>
                    <div
                      id={`sidebarItem${index}`}
                      className={`collapse ${item.links.some((link) => tab === link.href) ? "show" : ""}`}
                      data-bs-parent="#vendorSidebarMenu"
                    >
                      <ul className="list-disc pb-5 pl-40">
                        {item.links.map((link, linkIndex) => {
                          return (
                            <li key={linkIndex}>
                              <a
                                onClick={() =>
                                  handleRoute(`/admin-dashboard/${link.href}`, link.href)
                                }
                                className={`text-15 ${
                                  tab === link.href ? "side_current" : ""
                                } cursor`}
                              >
                                {link.title}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )
          );
        } else {
          // Render standalone items like Services, City, Region, and Category
          return (
            (
              <div className="sidebar__item" key={index}>
                <a
                  onClick={() => handleRoute(`/admin-dashboard/${item.href}`, item.href)}
                  className={`${
                    tab === item.href ? "side_current" : ""
                  } cursor sidebar__button d-flex items-center text-15 lh-1 fw-500`}
                >
                  <img src={item.icon} alt="image" className="mr-15" />
                  {item.title}
                </a>
              </div>
            )
          );
        }
      })}

      {/* Logout */}
      <div className="sidebar__item">
        <a
          href="/"
          onClick={logout}
          className="sidebar__button d-flex items-center text-15 lh-1 fw-500"
        >
          <img src="/img/dashboard/sidebar/log-out.svg" alt="image" className="mr-15" />
          Logout
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
