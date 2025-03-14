import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import BasicInformation from "./BasicInformation";
import DetailsAndPricing from "./DetailsAndPricing";
import MediaAndResources from "./MediaAndResources";
import AdministrativeControl from "./AdministrativeControl";
import axios from "axios";
import { api, krushiMahaDomain } from "@/utils/apiProvider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { showAlert } from "@/utils/isTextMatched";
import { formatPublishDate } from "@/utils/DOMUtils";

const Index = () => {
  let params = useParams();
  const state = useLocation()?.state || null;
  const mode = params.mode;
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [nonVegDish, setNonVegDish] = useState(null);
  const [errors, setError] = useState([]);
  const navigate = useNavigate();

  const [blogpostdata, setBlogPostData] = useState({
    title: "",
    content: "",
    slug: "",
    author: "Jio Kheti",
    published_date: new Date().toISOString(),
    seo_title: "",
    seo_description: "",
    keywords: "",  
    canonical_url: "",
    featured_image: "",
    featured_image_data: "",
    og_title: "",
    og_description: "",
    og_url: "",
    twitter_title: "",
    twitter_description: "",
    tags : [],
    category : [],
    sub_category : [],
    is_enable : 0
  });

  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const fetchCategories = async () => {
    try {
        const response = await axios.get(`${api}/api/categories/get-categories`);
        if (response.data.success) {
          setAllCategories(response.data.results);
        }
    } catch (error) {
        console.log('failed to fetch the user');
        console.error(error);
    }
  };

  useEffect(()=>{
    if (mode === "add") {
      setBlogPostData({
        title: "",
        content: "",
        slug: "",
        author: "Jio Kheti",
        published_date: new Date().toISOString(),
        seo_title: "",
        seo_description: "",
        keywords: "",  
        canonical_url: "",
        featured_image: "",
        featured_image_data: "",
        og_title: "",
        og_description: "",
        og_url: "",
        twitter_title: "",
        twitter_description: "",
        tags : [],
        category : [],
        sub_category : [],
        is_enable : 0})
    }
  },[mode]);

  useEffect(()=>{
    fetchCategories();
    if (mode === "edit") {
      let editFormData = {};
      if (state != null) {
        editFormData = {
          ...state,
          tags: JSON.parse(state?.tags),
          category: JSON.parse(state?.category),
          sub_category: JSON.parse(state?.sub_category),
        }
        delete editFormData.featured_image_data;
        setBlogPostData((prevState) => {
          delete prevState?.featured_image_data;
          return {
          ...prevState,
          ...editFormData
          }
        });
      }
    }
  },[]);

  useEffect(() => {
    if (blogpostdata.is_enable) {
      const isFormIncomplete = Object.values(blogpostdata).some(value => value === "" || (Array.isArray(value) && value.length === 0));
      setIsSaveDisabled(isFormIncomplete);
    } else {
      setIsSaveDisabled(false);
    }
    setIsNextDisabled(false);  // Adjust this based on specific step validation if needed
  }, [blogpostdata]);

  const handleCategoryDropDownChange = (category)=> {
    const {category_name, slug,  category_color_class} = category;
    let new_categories = [];
    if (blogpostdata.category.some(obj => obj["category_name"] === category_name)) {
      new_categories = blogpostdata.category.filter((category)=>{return category_name !== category.category_name})
    } else {
      new_categories = blogpostdata.category;
      new_categories.push({category_name: category_name, category_color_class: category_color_class, slug : slug});
    }
    setSelectedCategory([...new_categories]);
    setBlogPostData((prevState) => ({
      ...prevState,
      category: new_categories,
    }));
  }

  const handleSubCategoryDropDownChange = (subCategory)=> {
    const {sub_category_name, slug,  parent_category_name, category_color} = subCategory;
    let new_sub_categories = [];
    if (blogpostdata.sub_category.some(obj => obj["sub_category_name"] === sub_category_name)) {
      new_sub_categories = blogpostdata.sub_category.filter((subCategory)=>{return sub_category_name !== subCategory.sub_category_name})
    } else {
      new_sub_categories = blogpostdata.sub_category;
      new_sub_categories.push({sub_category_name: sub_category_name, category_color: category_color, parent_category_name: parent_category_name, slug : slug});
    }
    setBlogPostData((prevState) => ({
      ...prevState,
      sub_category: new_sub_categories,
    }));
  }

  const handleTagsDropDownChange = (tag)=> {
    const {tag_name, slug, tag_color} = tag;
    let new_tag = [];
    if (blogpostdata.tags.some(obj => obj["tag_name"] === tag_name)) {
      new_tag = blogpostdata.tags.filter((tag)=>{return tag_name !== tag.tag_name})
    } else {
      new_tag = blogpostdata.tags;
      new_tag.push({tag_name:tag_name, slug: slug, tag_color: tag_color });
    }
    setBlogPostData((prevState) => ({
      ...prevState,
      tags: new_tag,
    }));
  }

  const handleDropDownChange = ({name,value}) => {
    setBlogPostData((prevState) => ({
        ...prevState,
        [name]: value,
    }));
  }

  const generateCanonicalUrl = (url) => {
    return `${krushiMahaDomain}/blog/${url}`;
  }

  const handleChange = (event)=> {
    const {name,value} = event.target; 
    if (name === "title") {
      setBlogPostData((prevState) => ({
          ...prevState,
          "title": value,
          "seo_title" : value,
          "og_title" :value,
          "twitter_title" : value
       })); 
    } else if (name === "seo_description") {
      setBlogPostData((prevState) => ({
          ...prevState,
          "seo_description": value,
          "og_description" : value,
          "twitter_description" :value,
       }));
    }else if (name === "slug") {
      setBlogPostData((prevState) => ({
          ...prevState,
          "slug": value,
          "canonical_url" : generateCanonicalUrl(value),
          "og_url" : generateCanonicalUrl(value)
       }));
    } else {
      setBlogPostData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    
  }

  const handleCheckBox = (checkbox)=>{
    const {name,value} = checkbox;
    setBlogPostData((prevState) => ({
        ...prevState,
        [name]: value,
    }));
  } 

  const [tabIndex, setTabIndex] = useState(0);
  const defaultTabs = [
    {
      label: "Basic Information",
      labelNo: 1,
      content: <BasicInformation setBlogPostData={setBlogPostData} selectedCategory={selectedCategory} handleTagsDropDownChange={handleTagsDropDownChange} handleCategoryDropDownChange = {handleCategoryDropDownChange} handleSubCategoryDropDownChange={handleSubCategoryDropDownChange} allCategories={allCategories} blogpostdata={blogpostdata} handleChange={handleChange} handleDropDownChange={handleDropDownChange}/>,
    },
    {
      label: "Content and Meta",
      labelNo: 2,
      content: <DetailsAndPricing handleChange={handleChange} handleDropDownChange={handleDropDownChange} blogpostdata={blogpostdata} handleCategoryDropDownChange = {handleCategoryDropDownChange}/>,
    },
    {
      label: "Media & Resources",
      labelNo: 3,
      content: <MediaAndResources blogpostdata={blogpostdata} setBlogPostData={setBlogPostData}/>,
    }
  ];

  const getTabs = () => {
    defaultTabs.push({
      label: "Administrative Control",
      labelNo: 4,
      content: <AdministrativeControl blogpostdata={blogpostdata} handleChange={handleChange} handleCheckBox={handleCheckBox} handleDropDownChange={handleDropDownChange} />,
    })
    return defaultTabs;
  }

  const validateFormData = (formData) => {
    delete formData.sub_category;
    const errors = [];
    Object.keys(formData).forEach((key) => {
      if (key === "is_featured") return;
      const value = formData[key];
      if (Array.isArray(value) && value.length === 0) {
        errors.push(`${key.replace(/_/g, ' ')} is required.`);
      }
      else if (typeof value === "string" && value.trim() === "") {
        errors.push(`${key.replace(/_/g, ' ')} is required.`);
      }
      else if (typeof value === "number" && isNaN(value)) {
        errors.push(`${key.replace(/_/g, ' ')} is required.`);
      }
    });
    return errors;
  };

  const getURLAndBodyForUploadImage = (mode, ImageBodyApi) => {
    if (mode === "edit") {
      return [`${krushiMahaDomain}/api/ImageUpload`,{...ImageBodyApi, oldImagePath : state.featured_image}];
    } else {
      return [`${krushiMahaDomain}/api/ImageUpload`,ImageBodyApi];
    }
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form data
    const currentErrors = validateFormData(blogpostdata);
    setError(currentErrors);
  
    if (blogpostdata.is_enable && currentErrors.length > 0) {
      showAlert(currentErrors[0], "error");
      console.error("Form validation failed:", currentErrors);
      return; // Exit early if validation fails
    }
  
    try {
      let ApiBody = { ...blogpostdata }; // Clone blogpostdata to modify
      ApiBody.published_date = formatPublishDate(blogpostdata.published_date); // Format date early
  
      // Check if image needs to be updated
      const shouldUpdateImage = state?.featured_image !== blogpostdata.featured_image;
  
      if (shouldUpdateImage && blogpostdata.featured_image_data) {
        // Prepare image upload payload
        const ImageBodyApi = {
          image: blogpostdata.featured_image_data,
          imageName: blogpostdata.featured_image,
        };
  
        // Upload image
        const [imageUploadUrl, imageUploadBody] = getURLAndBodyForUploadImage(mode, ImageBodyApi);
        const ImageUploaderResponse = await axios.post(imageUploadUrl, imageUploadBody);
  
        if (ImageUploaderResponse.status === 200) {
          showAlert(ImageUploaderResponse.data.message || "Image uploaded successfully", "success");
          ApiBody.featured_image = ImageUploaderResponse.data.imageUrl; // Update with new image URL
        } else {
          showAlert("Failed to upload image", "error");
          return; // Exit if image upload fails
        }
      } else if (!shouldUpdateImage) {
        // Use existing image if no update is needed
        ApiBody.featured_image = state.featured_image;
      }
  
      // Remove temporary image data from payload
      delete ApiBody.featured_image_data;
  
      // Determine API endpoint based on mode
      const url = mode === "edit" 
        ? `${api}/api/blogpost/update-blog/${state.id}` 
        : `${api}/api/blogpost/create-blog`;
  
      // Submit blog post data
      const response = await axios.post(url, ApiBody);
  
      if (response.status === 201 || response.status === 200) { // Handle both create (201) and update (200) success
        // Reset form
        setBlogPostData({
          title: "",
          content: "",
          slug: "",
          author: "Jio Kheti",
          published_date: new Date().toISOString(),
          seo_title: "",
          seo_description: "",
          keywords: "",
          canonical_url: "",
          featured_image: "",
          og_title: "",
          og_description: "",
          og_url: "",
          twitter_title: "",
          twitter_description: "",
          tags: [],
          category: [],
          sub_category: []
        });
        showAlert(response.data.message || "Blog post saved successfully", "success");
        navigate("/"); // Redirect to home
      } else {
        showAlert("Something went wrong", "error");
      }
    } catch (error) {
      // Handle specific error responses
      if (error.response) {
        const errorMessage = error.response.data?.error || "An error occurred";
        showAlert(errorMessage, "error");
      } else {
        showAlert("Network error or server unreachable", "error");
      }
      console.error("Error submitting form:", error);
    }
  
    console.log("Form submission completed");
  };

  const handleNextStep = () => {
    setTabIndex((prev) => (prev + 1) % getTabs().length);
  }

  return (
    <>
      <Tabs
        className="tabs -underline-2 js-tabs"
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20">
          {getTabs().map((tab, index) => (
            <Tab key={index} className="col-auto">
              <button className="tabs__button text-18 lg:text-16 text-light-1 fw-500 pb-5 lg:pb-0 js-tabs-button">
                {tab.labelNo}. {tab.label}
              </button>
            </Tab>
          ))}
        </TabList>

        <div className="tabs__content pt-30 js-tabs-content">
          {getTabs().map((tab, index) => (
            <TabPanel
              key={index}
              className={`-tab-item-${index + 1} ${
                tabIndex === index ? "is-tab-el-active" : ""
              }`}
            >
              {tab.content}
            </TabPanel>
          ))}
        </div>
      </Tabs>
      <div className="pt-30" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {errors.length !== 0 && <div className="text-15 lh-15 text-light-1 ml-10">
          {errors[0]}
        </div>}
        <button className="button h-50 px-24 -dark-1 bg-blue-1 text-white" onClick={handleNextStep} style={{ marginRight: '10px' }} disabled={isNextDisabled}>
          Next Step <div className="icon-arrow-top-right ml-15" />
        </button>
        <button className="button h-50 px-24 -dark-1 bg-blue-1 text-white" onClick={handleSubmit} disabled={isSaveDisabled}>
          Save Changes <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
    </>
  );
};

export default Index;
