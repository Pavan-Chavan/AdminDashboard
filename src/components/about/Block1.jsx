const Block1 = () => {
  return (
    <>
      <div className="col-lg-5">
        <h2 className="text-30 fw-600">About WedEazzy.com</h2>
        <p className="mt-5">Welcome to <b>Wedeazzy</b>, your one-stop solution for finding the perfect wedding venues and vendors across India!  
        </p>
        <p className="text-dark-1 mt-30 lg:mt-40 md:mt-20">
        At Wedeazzy, we understand the importance of creating unforgettable memories, and that starts with finding the right location and services for your special day. Whether you’re a couple planning the wedding of your dreams or a venue and vendor looking to showcase your services to a wider audience, Wedeazzy is here to bridge the gap.  
          <br />
          <br />
        </p>
        <h2 className="text-30 fw-600">Who We Are</h2>
        <p className="text-dark-1 mt-5 lg:mt-40 md:mt-20">Wedeazzy is a dynamic platform designed to connect wedding venues and service providers with their ideal customers. We bring together a curated selection of vendors, from stunning wedding venues to talented photographers, makeup artists, decorators, and more. Our mission is to simplify the planning process for couples while empowering vendors with the tools they need to grow their business.  
        </p>
      </div>
      {/* End .col */}

      <div className="col-lg-6">
        <img
          src="/img/pages/about/2.jpg"
          alt="image"
          className="rounded-4 w-100"
        />
      </div>
      {/* End .col */}
    </>
  );
};

export default Block1;
