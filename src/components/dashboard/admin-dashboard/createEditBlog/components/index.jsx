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
    author: "",
    published_date: "",
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
        author: "",
        published_date: "",
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

  const handleChange = (event)=> {
    const {name,value} = event.target;
    setBlogPostData((prevState) => ({
        ...prevState,
        [name]: value,
    }));
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
    const currentError = validateFormData(blogpostdata);
    setError(currentError);
    if (blogpostdata.is_enable && currentError.length > 0) {
      showAlert(currentError[0], "error");
      console.error("Form validation failed:", errors);
    } else {
      let ApiBody = {
        ...blogpostdata,
        published_date : formatPublishDate(blogpostdata.published_date)
      }
      let ImageBodyApi = {
        image : blogpostdata.featured_image_data,
        imageName : blogpostdata.featured_image
      }
      delete ApiBody.featured_image_data;
      try {
        const response = await axios.post(...getURLAndBodyForUploadImage(mode, ImageBodyApi))
        if (response.status === 200) {
          showAlert(response.message, 'sucess');
        } else {
          showAlert("Failed to upload image", 'error');
        }
      } catch (error) {
        showAlert("Failed to upload image", 'error');
      }
      try {
        const url = mode === "edit" ? `${api}/api/blogpost/update-blog/${state.id}` : `${api}/api/blogpost/create-blog`;
        const response = await axios.post(url, ApiBody);
        if (response.status === 201) {
          setBlogPostData({
            title: "",
            content: "",
            slug: "",
            author: "",
            published_date: "",
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
            tags : [],
            category : [],
            sub_category : []
          });
          showAlert(response.message, 'sucess');
          navigate("/");
        } else {
          showAlert('something went wrong', 'error');
        }
      } catch (error) {
        if (error) window.alert(error.response.data.error);
        console.error('Error:', error);
      }
      console.log("Form is valid, submitting data...");
    }
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
