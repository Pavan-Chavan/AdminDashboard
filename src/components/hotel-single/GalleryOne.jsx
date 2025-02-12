import ModalVideo from "react-modal-video";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Link } from "react-router-dom";
import React, { useState } from "react";

export default function GalleryOne({ venueData }) {
  const [isOpen, setOpen] = useState(false);
  const venue_images = venueData?.venue_images || "";
  const images = venue_images ? JSON.parse(venue_images) : [];
  return (
    <>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="oqNZOOWF8qM"
        onClose={() => setOpen(false)}
      />
      <section className="pt-40">
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-auto">
              <div className="row x-gap-20  items-center">
                <div className="col-auto">
                  <h1 className="text-30 sm:text-25 fw-600">{venueData?.venue_name}</h1>
                </div>
                {/* End .col */}
              </div>
              {/* End .row */}

              <div className="row x-gap-20 y-gap-20 items-center">
                <div className="col-auto">
                  <div className="d-flex items-center text-15 text-light-1">
                    <i className="icon-location-2 text-16 mr-5" />
                    {venueData?.venue_address} {", "} {venueData?.region_name}
                  </div>
                </div>
                <div className="col-auto">
                  <button
                    onClick={()=>{window.open(venueData.venue_map_url, "_blank");}}
                    data-x-click="mapFilter"
                    className="text-blue-1 text-15 underline"
                  >
                    Show on map
                  </button>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}

          <Gallery>
            <div className="galleryGrid -type-1 pt-30">
              {images && images.splice(0,5).map((image)=>{
                return (
                  <div className="galleryGrid__item">
                    <Item
                      original={image}
                      thumbnail={image}
                      width={"auto"}
                      height={"auto"}
                    >
                      {({ ref, open }) => (
                        <img
                          ref={ref}
                          onClick={open}
                          src={image}
                          alt="image"
                          className="rounded-4"
                          role="button"
                        />
                      )}
                    </Item>
                  </div>
                )
              })}
            </div>
          </Gallery>
        </div>
        {/* End .container */}
      </section>
    </>
  );
}
