import React, { useState } from "react";
import Select from "react-select";
const SearchItems = ({
  name,
  list,
  isMulti = false,
  onChange,
  defaultValue = "Any",
}) => {
  return (
    <>
      <div className="flex flex-col">
        <p className="">{name}</p>
        <Select
          isMulti={isMulti}
          name="genres"
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "#1a1a1a",
            }),
            singleValue: (base) => ({
              ...base,
              color: "white",
            }),
            option: (base) => ({
              ...base,
              backgroundColor: "#1a1a1a",

              color: "white",
            }),
          }}
          options={list}
          isClearable
          defaultValue={defaultValue}
          placeholder={defaultValue}
          className="basic-multi-select  text-black"
          classNamePrefix="select"
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default SearchItems;
