
import axios from "axios";
import { api } from "@/utils/apiProvider";
import { useEffect, useState } from "react";
import { showAlert } from "@/utils/isTextMatched";
import { createSlug, debounce } from "@/utils/DOMUtils";

const BasicInformation = ({
  blogpostdata = {},
  allCategories = [],
  handleChange = () => {},
  handleTagsDropDownChange = () => {},
  handleCategoryDropDownChange = () => {},
  handleDropDownChange
}) => {
  const [subCategory, setSubCategory] = useState([]);
  const [selectedSubCategory, setSubSelectedCategory] = useState(null);
  const [tags, setTags] = useState([]);
  const [serachTagQuery, setSearchTagQuery] = useState("");

  const fetchSubCategory = async (category) => {
    try {
      const response = await axios.get(`${api}/api/sub-categories/get-sub-categories/${category}`);
      if (response.status === 200) {
        setSubCategory(response.data);
      }
    } catch (error) {
      console.log("Failed to fetch cities");
      console.error(error);
    }
  };

  const fetchTags = async (serachTagQuery) => {
    try {
      const response = await axios.get(`${api}/api/tags/get-tags?tag_name=${serachTagQuery}`);
      if (response.status === 200) {
        setTags(response.data);
      } else {
        showAlert("Failed to fetch tags")
      }
    } catch (error) {
      console.log("Failed to fetch tags");
      console.error(error);
    }
  };

  const renderSelectedTags = () => {
    return blogpostdata.tags?.length === 0 ? (
      "Select Tags"
    ) : (
      blogpostdata.tags.map((tag) => (
        <div
          key={tag.tag_id}
          className={`py-5 px-15 mr-5 rounded-right-4 text-12 lh-16 fw-500 uppercase text-white`}
          style={{
            backgroundColor: tag.tag_color, // Apply the category's color
            width: "fit-content",
            marginBottom: "2px"
          }}
        >
          {tag.tag_name}
        </div>
      ))
    );
  };

  const handleOnTagSearch = (e) => {
    const searchString = e.target.value;
      debounce(()=>{
        setSearchTagQuery(searchString);
      }
      ,1000)
    (searchString);
  }

  const handleSubCategoryDropDownChange = (subCategory) => {
    setSubSelectedCategory(subCategory);
    handleDropDownChange({ name: "sub_category", value: subCategory.sub_category_name });
  };

  const addTag = async (e) => {
    const body = { 
      tag_name : e.target.value,
      slug : createSlug(e.target.value),
      tag_color : "#233223"
    };
    try {
      const response = await axios.post(`${api}/api/tags/add-tags`,body);
      if (response.status === 201) {
        handleTagsDropDownChange({...body, tag_id : response.data.id});
        showAlert("New Tag Added !!", "success");
      } else {
        showAlert("failed to add tag","error");
      }
    } catch (error) {
      console.log(error);
      showAlert("failed to add tag","error");
    }
  };

  useEffect(() => {
    if (blogpostdata?.sub_category != selectedSubCategory?.sub_category_name && blogpostdata.category != "") {
      fetchSubCategory(blogpostdata.category);
    }
  }, [blogpostdata]);

  useEffect(()=>{
    fetchTags(serachTagQuery);
  },[serachTagQuery]);

  return (
    <>
      <div className="col-xl-10">
        <div className="row x-gap-20 y-gap-20">
          <div className="col-12">
            <div className="form-input">
              <input
                type="text"
                required
                name="title"
                value={blogpostdata?.title}
                onChange={handleChange}
              />
              <label className="lh-1 text-16 text-light-1">Title</label>
            </div>
          </div>
          <div className="col-12">
          <div
            className="form-input"
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "8px",
            }}
          >
            <div className="dropdown js-dropdown js-services-active w-100">
              <div
                className="dropdown__button d-flex items-center justify-between bg-white rounded-4 w-100 text-14 px-20 h-50 text-14"
                data-bs-toggle="dropdown"
                data-bs-auto-close="true"
                aria-expanded="false"
                data-bs-offset="0,10"
              >
                <span className="d-flex js-dropdown-title">
                  {blogpostdata.category === "" ? "Select category" : blogpostdata.category}
                </span>
                <i className="icon icon-chevron-sm-down text-7 ml-10" />
              </div>
              <div className="toggle-element -dropdown w-100 dropdown-menu">
                <div className="text-14 y-gap-15 js-dropdown-list">
                  {allCategories.map((category, index) => (
                    <div
                      key={index}
                      id={category.category_id}
                      className={`js-dropdown-link`}
                      style={{flex: "0 0 130px", borderRadius: "0 15px 15px 0"}}
                      onClick={() => {
                        handleCategoryDropDownChange(category.category_name);
                      }}
                    >
                      {category.category_name} {category === blogpostdata.category ? "*" : ""}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
          <div className="col-6">
            <div
              className="form-input"
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "8px",
              }}
            >
              <div className="dropdown js-dropdown js-services-active w-100">
                <div
                  className="dropdown__button d-flex items-center justify-between bg-white rounded-4 w-100 text-14 px-20 h-50 text-14"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="true"
                  aria-expanded="false"
                  data-bs-offset="0,10"
                >
                  <span className="js-dropdown-title">
                    {blogpostdata.sub_category == "" ? "Select Sub Category" : blogpostdata.sub_category}
                  </span>
                  <i className="icon icon-chevron-sm-down text-7 ml-10" />
                </div>
                <div className="toggle-element -dropdown w-100 dropdown-menu">
                  <div className="text-14 y-gap-15 js-dropdown-list">
                    {subCategory.map((option, index) => (
                      <div
                        key={index}
                        id={option.sub_category_id}
                        name="sub_category_name"
                        className={`${
                          blogpostdata.sub_category === option.sub_category_name
                            ? "text-blue-1"
                            : ""
                        } js-dropdown-link`}
                        onClick={() => {
                          handleSubCategoryDropDownChange(option);
                        }}
                      >
                        {option.sub_category_name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div
              className="form-input"
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "8px",
              }}
            >
              <div className="dropdown js-dropdown js-services-active w-100">
                <div
                  className="dropdown__button d-flex items-center justify-between bg-white rounded-4 w-100 text-14 px-20 h-50 text-14"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                  data-bs-offset="0,10"
                  style={{height:"auto !important"}}
                >
                  <span className="js-dropdown-title d-flex flex-wrap">
                    {renderSelectedTags()}
                  </span>
                  <i className="icon icon-chevron-sm-down text-7 ml-10" />
                </div>
                <div className="toggle-element -dropdown w-100 dropdown-menu">
                  <div className="text-14 y-gap-15 js-dropdown-list">
                    <div className="form-input">
                      <input type="text" className="tag-search-input" onChange={handleOnTagSearch} />
                      <button placeholder="Serach Tags" className="tag-search-button button h-50 px-24 -dark-1 bg-blue-1 text-white" value={serachTagQuery} onClick={addTag} disabled={!(serachTagQuery !== "")}>Add</button>
                    </div>
                    {tags.map((tag, index) => (
                      <div
                        key={index}
                        id={tag.id}
                        name="tag"
                        style={{
                          color: blogpostdata?.tags?.some((selectedTags) => tag.tag_name === selectedTags.tag_name)
                            ? tag.tag_color
                            : "inherit", // Highlight selected categories
                            flex: "0 0 130px", borderRadius: "0 15px 15px 0",
                        }}
                        onClick={() => {
                          handleTagsDropDownChange(tag);
                        }}
                      >
                        {tag.tag_name}{blogpostdata?.tags?.some((selectedTags) => tag.tag_name === selectedTags.tag_name) ? "*" : ""} 
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            {/* Slug */}
            <div className="form-input">
              <input
                type="text"
                required
                name="slug"
                value={blogpostdata?.slug}
                onChange={handleChange}
              />
              <label className="lh-1 text-16 text-light-1">Slug</label>
            </div>
          </div>
            {/* Author */}
          <div className="form-input">
            <input type="text" required name="author" value={blogpostdata?.author} onChange={handleChange} />
            <label className="lh-1 text-16 text-light-1">Author</label>
          </div>

          {/* Published Date */}
          <div className="form-input">
            <input type="date" name="published_date" value={blogpostdata?.published_date} onChange={handleChange} />
            <label className="lh-1 text-16 text-light-1">Published Date</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicInformation;
