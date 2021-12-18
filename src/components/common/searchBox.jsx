import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      onChange={onChange}
      name="query"
      id="search"
      className="form-control"
      placeholder="Search..."
      value={value}
      type="text"
    />
  );
};

export default SearchBox;
