import FilterBox from "../../components/hotel-single/filter-box";

const SidebarRight = ({ venue, id }) => {
  return (
    <section id="bookvenue">
      <aside className="ml-50 lg:ml-0">
        <div className="px-30 py-30 border-light rounded-4 shadow-4">
          <div className="d-flex items-center justify-between">
            <div>
              <span className="text-20 fw-500">Book Your Dates</span>
            </div>
          </div>
          {/* End d-flex */}

          <div className="row y-gap-20 pt-10">
            <FilterBox venue={venue} type={"venue"} id={id}/>
          </div>
        </div>
        {/* End px-30 FilterBox */}
      </aside>
    </section>
  );
};

export default SidebarRight;
