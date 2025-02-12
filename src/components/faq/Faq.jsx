const Faq = () => {
  const faqContent = [
    {
      id: 1,
      collapseTarget: "One",
      title: "What is WedEazzy.com ?",
      content: `WedEazzy.com is your one-stop platform for planning the perfect wedding. We connect you with top venues, trusted vendors, and a variety of services to make your big day unforgettable.`,
    },
    {
      id: 2,
      collapseTarget: "Two",
      title: "How do I book a venue or vendor through WedEazzy.com ?",
      content: `It’s simple! Browse our curated list of venues and vendors, check availability, and book directly through our platform. Our intuitive search and booking system ensures a hassle-free experience.`,
    },
    {
      id: 3,
      collapseTarget: "Three",
      title: "Are all the vendors on WedEazzy.com verified ?",
      content: `Yes, we handpick and verify all vendors to ensure you get the best services for your wedding.`,
    },
    {
      id: 4,
      collapseTarget: "Four",
      title: "Can I customize my wedding plan through WedEazzy.com ?",
      content: `Absolutely! Our platform is designed to cater to your unique preferences. From themes and decor to catering and photography, you can tailor every detail to suit your needs.`,
    },
    {
      id: 5,
      collapseTarget: "Five",
      title: "How do I register as a vendor on WedEazzy.com ?",
      content: `If you’re a vendor looking to join our platform, click on the “List Your Business” option and follow the registration process. Our team will review and approve your application.`,
    },
  ];
  return (
    <>
      {faqContent.map((item) => (
        <div className="col-12" key={item.id}>
          <div className="accordion__item px-20 py-20 border-light rounded-4">
            <div
              className="accordion__button d-flex items-center"
              data-bs-toggle="collapse"
              data-bs-target={`#${item.collapseTarget}`}
            >
              <div className="accordion__icon size-40 flex-center bg-light-2 rounded-full mr-20">
                <i className="icon-plus" />
                <i className="icon-minus" />
              </div>
              <div className="button text-dark-1 text-start">{item.title}</div>
            </div>
            {/* End accordion button */}

            <div
              className="accordion-collapse collapse"
              id={item.collapseTarget}
              data-bs-parent="#Faq1"
            >
              <div className="pt-15 pl-60">
                <p className="text-15">{item.content}</p>
              </div>
            </div>
            {/* End accordion conent */}
          </div>
        </div>
      ))}
    </>
  );
};

export default Faq;
