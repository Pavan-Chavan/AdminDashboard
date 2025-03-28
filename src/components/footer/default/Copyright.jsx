import Social from "../../common/social/Social";

const Copyright = () => {
  return (
    <div className="row justify-between items-center y-gap-10">
      <div className="col-auto">
        <div className="row x-gap-30 y-gap-10">
          <div className="col-auto">
            <div className="d-flex items-center">
            Copyright © {new Date().getFullYear()}
              <a
                href="https://jiokheti.com"
                className="mx-2"
                target="_blank"
                rel="noopener noreferrer"
              >
              JioKheti | 
              </a>
              All Rights Reserved.
            </div>
          </div>
          {/* End .col */}

          {/* <div className="col-auto">
            <div className="d-flex x-gap-15">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div> */}
          {/* End .col */}
        </div>
        {/* End .row */}
      </div>
      {/* End .col */}

      {/* <div className="col-auto">
        <div className="row y-gap-10 items-center">
          <div className="col-auto">
            <div className="d-flex x-gap-20 items-center">
              <Social />
            </div>
          </div>
        </div>
      </div> */}
      {/* End .col */}
    </div>
  );
};

export default Copyright;
