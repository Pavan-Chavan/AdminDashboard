const ContactInfo = () => {
  const contactContent = [
    {
      id: 1,
      title: "Toll Free Customer Care",
      action: "tel:+91 75889 86874",
      text: "+91 75889 86874",
    },
    {
      id: 2,
      title: "Need live support?",
      action: "mailto:krushimaharashtra.info@gmail.com",
      text: "krushimaharashtra.info@gmail.com",
    },
  ];
  return (
    <>
      {contactContent.map((item) => (
        <div className="mt-30" key={item.id}>
          <div className="mt-30">
            <div className="text-14 mt-30">{item.title}</div>
            <a href="#" className="text-18 fw-500 mt-5">
              {item.text}
            </a>
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
