import { debounce } from "@/utils/DOMUtils";
import AddUser from "./AddUser";
import SearchBox from "./SearchBox";

const FilterBox = ({setSearchParameter, setRefresh, refresh}) => {
  const refreshCategories = () =>{
    setRefresh(!refresh)
  }

  const handleOnsearch = debounce((searchString) => {
    setSearchParameter(searchString);
  }, 1000);
  
  return (
    <div className="row x-gap-20 y-gap-20 items-center">

      <div className="col-auto">
        <SearchBox onSearch = {handleOnsearch}/>
      </div>
      {/* End col-auto */}
      
      <div className="col-auto">
        <AddUser refreshCategories = {refreshCategories}/>
      </div>
      {/* End col-auto */}
    </div>
  );
};

export default FilterBox;