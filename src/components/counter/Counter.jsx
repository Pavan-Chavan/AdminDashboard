const Counter = () => {
  const blockContent = [
    {
      id: 1,
      number: "49,580",
      meta: "Venues",
      hasUnit: "",
      delayAnim: "100",
    },
    {
      id: 2,
      number: "5,869",
      meta: "Vendors",
      hasUnit: "",
      delayAnim: "200",
    },
    {
      id: 3,
      number: "2",
      meta: "Happy customers",
      hasUnit: "M",
      delayAnim: "300",
    },
    {
      id: 4,
      number: "574,974",
      meta: "Our Volunteers",
      hasUnit: "",
      delayAnim: "400",
    },
  ];
  return (
    <>
      {blockContent.map((item) => (
        <div
          className="col-xl-3 col-6"
          key={item.id}
          data-aos="fade"
          data-aos-delay={item.delayAnim}
        >
          <div className="text-40 lg:text-30 lh-13 fw-600">
            {item.number}
            {item.hasUnit}
          </div>
          <div className="text-14 lh-14 text-light-1 mt-5">{item.meta}</div>
        </div>
      ))}
    </>
  );
};

export default Counter;
