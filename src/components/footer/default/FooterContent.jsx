import { isArray } from "lodash";
import { Link } from "react-router-dom";

const FooterContent = ({footerDataContent = []}) => {
  return (
    <>
      {isArray(footerDataContent) && footerDataContent.map((item) => (
        <div className="col-xl-2 col-lg-6 col-sm-6" style={{flex: "1 0 16%"}} key={item.id}>
          <h5 className="text-12 fw-500 mb-30">{item.title}</h5>
          <div className="d-flex y-gap-5 flex-column" >
            {item.menuList.map((menu, i) => (
              <a href={menu.routerPath} key={i}>
                {menu.name}
              </a>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default FooterContent;
