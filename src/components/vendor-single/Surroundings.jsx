const Surroundings = ({vendorData}) => {
  const vendor_package = vendorData?.vendor_package ? JSON.parse(vendorData.vendor_package) : [];
  return (
    <>
      <div className="col-lg-4 col-md-6 ">
        <div className="mb-40 md:mb-30">
          <div className="row y-gap-20 x-gap-0 pt-10">
            {vendor_package.map((item) => (
              <div className="col-12 border-top-light" key={item.id}>
                <div className="row items-center justify-between">
                  <div className="col-auto">
                    <div className="text-15">{item.component_name}</div>
                  </div>
                  <div className="col-auto">
                    <div className="text-15 text-right">
                      {item.component_remark}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Surroundings;
