import parse from "html-react-parser";

const Overview = ({venue}) => {
  return (
    <>
      <h3 className="text-22 fw-500 pt-40 border-top-light">Overview</h3>
      <p className="text-dark-1 text-15 mt-20">
        {venue?.venue_overview && parse(venue?.venue_overview) || "loading"}
      </p>
    </>
  );
};

export default Overview;
