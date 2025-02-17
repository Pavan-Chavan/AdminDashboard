import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const DetailsAndPricing = ({
  blogpostdata = {},
  handleChange,
  handleDropDownChange
}) => {

  return (
    <div className="col-xl-10">
      <div className="text-18 fw-500 mb-10">Details & Pricing</div>
      <div className="row x-gap-20 y-gap-20">
        <div className="col-12">
          <ReactQuill
            value={blogpostdata?.content}
            onChange={(text)=>{handleDropDownChange({name:"content",value:text})}}
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }], // Headings
                ["bold", "italic", "underline", "strike"], // Formatting buttons
                [{ list: "ordered" }, { list: "bullet" }], // Lists
                ["link"], // Links
                ["clean"], // Remove formatting
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "list",
              "bullet",
              "link",
            ]}
            placeholder="Write overview your venue..."
          />
        </div>
        {/* SEO Title */}
        <div className="form-input">
          <input type="text" name="seo_title" placeholder="SEO title" value={blogpostdata?.seo_title} onChange={handleChange} />
          <label className="lh-1 text-16 text-light-1">SEO Title</label>
        </div>

        {/* SEO Description */}
        <div className="form-input">
          <textarea name="seo_description" value={blogpostdata?.seo_description} onChange={handleChange} />
          <label className="lh-1 text-16 text-light-1">SEO Description</label>
        </div>

        {/* Keywords */}
        <div className="form-input">
          <input type="text" name="keywords" value={blogpostdata?.keywords} onChange={handleChange} />
          <label className="lh-1 text-16 text-light-1">Keywords (comma-separated)</label>
        </div>

        {/* Canonical URL */}
        <div className="form-input">
          <input type="text" name="canonical_url" value={blogpostdata?.canonical_url} onChange={handleChange} />
          <label className="lh-1 text-16 text-light-1">Canonical URL</label>
        </div>

        <div className="form-input">
          <input type="text" name="og_title" value={blogpostdata?.og_title} onChange={handleChange} />
          <label className="lh-1 text-16 text-light-1">Open Graph Title</label>
        </div>

        {/* Open Graph Description */}
        <div className="form-input">
          <textarea name="og_description" value={blogpostdata?.og_description} onChange={handleChange} />
          <label className="lh-1 text-16 text-light-1">Open Graph Description</label>
        </div>

        {/* Open Graph URL */}
        <div className="form-input">
          <input type="text" name="og_url" value={blogpostdata?.og_url} onChange={handleChange} />
          <label className="lh-1 text-16 text-light-1">Open Graph URL</label>
        </div>

        {/* Twitter Title */}
        <div className="form-input">
          <input type="text" name="twitter_title" value={blogpostdata?.twitter_title} onChange={handleChange} />
          <label className="lh-1 text-16 text-light-1">Twitter Title</label>
        </div>

        {/* Twitter Description */}
        <div className="form-input">
          <textarea name="twitter_description" value={blogpostdata?.twitter_description} onChange={handleChange} />
          <label className="lh-1 text-16 text-light-1">Twitter Description</label>
        </div>
      </div>
    </div>
  );
};

export default DetailsAndPricing;
