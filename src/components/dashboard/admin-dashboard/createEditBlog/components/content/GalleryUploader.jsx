import { krushiMahaDomain } from "@/utils/apiProvider";
import { getImageName } from "@/utils/DOMUtils";
import { useState } from "react";

const GalleryUploader = ({blogpostdata, setBlogPostData, image, title}) => {
  // const [venueFormData.venue_images, setVenueFormData] = useState([]);
  const [error, setError] = useState("");

  const handleFileUpload = (event) => {
    const fileList = event.target.files;
    const newImages = [];
    const maxSize = 1800; // in pixels

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          if (img.width > maxSize || img.height > maxSize) {
            setError(
              `Image ${file.name} exceeds the maximum size of ${maxSize}px.`,
            );
          } else if (
            !["image/png", "image/jpeg"].includes(file.type.toLowerCase())
          ) {
            setError(
              `Image ${file.name} is not a valid file type. Only PNG and JPEG are allowed.`,
            );
          } else {
            setBlogPostData((prevState) => ({
              ...prevState,
              "featured_image": getImageName(file),
              [event.target.name]: reader.result
            }));
            setError("");
          }
        };
        img.onerror = () => {
          setError(`Image ${file.name} could not be loaded.`);
        };
        img.src = reader.result;
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setBlogPostData((prevState) => ({
      ...prevState,
      [image]: "",
      featured_image : ""
    }));
  };

  const getImagePath = () => {
    if(blogpostdata.featured_image_data) {
      return blogpostdata.featured_image_data;
    } else if (blogpostdata.featured_image != "") {
      return `${krushiMahaDomain}/images/blog-thumbnail/${blogpostdata.featured_image}`;
    } else {
      return ""
    }
  }
  return (
    <div className="row x-gap-20 y-gap-20 pt-15">
      <div className="col-auto">
        <div className="w-200">
          <label htmlFor={image} className="d-flex ratio ratio-1:1">
            <div className="flex-center flex-column text-center bg-blue-2 h-full w-1/1 absolute rounded-4 border-type-1">
              <div className="icon-upload-file text-40 text-blue-1 mb-10" />
              <div className="text-blue-1 fw-500">Upload {title} Images</div>
            </div>
          </label>
          <input
            type="file"
            id={image}
            name={image}
            accept="image/png, image/jpeg"
            className="d-none"
            onChange={handleFileUpload}
          />
          <div className="text-start mt-10 text-14 text-light-1">
            PNG or JPG no bigger than 800px wide and tall.
          </div>
        </div>
      </div>
      {/* End uploader field */}
        {(blogpostdata.featured_image_data || blogpostdata.featured_image != "") && <div className="col-auto">
          <div className="d-flex ratio ratio-1:1 w-200">
            <img src={getImagePath()} alt="image" className="img-ratio rounded-4" />
            <div
              className="d-flex justify-end px-10 py-10 h-100 w-1/1 absolute"
              onClick={handleRemoveImage}
            >
              <div className="size-40 bg-white rounded-4 flex-center cursor-pointer">
                <i className="icon-trash text-16" />
              </div>
            </div>
          </div>
        </div>}
      {error && <div className="col-12 mb-10  text-red-1">{error}</div>}
    </div>
  );
};

export default GalleryUploader;
