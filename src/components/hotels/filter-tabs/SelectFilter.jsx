const SelectFilter = ({allCategories = [], handleVenueFilter}) => {
  return (
    <select className="form-select rounded-4 border-light justify-between text-16 fw-500 px-20 h-50 w-140 sm:w-full text-14" onChange={handleVenueFilter}>
      <option defaultValue value={""}>All Category</option>
      {allCategories && allCategories.map((category)=>{
        return <option value={category.category_name}>{category.category_name}</option>
      })}
    </select>
  );
};

export default SelectFilter;
