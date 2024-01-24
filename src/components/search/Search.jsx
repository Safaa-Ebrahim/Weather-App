import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_APT_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const handelOnChange = (searchData) => {
    setSearch(searchData);
    // onSearchChange(searchData);
  };

  const loadOption = async (value) => {
    try {
      const response = await fetch(
        `${GEO_APT_URL}/cities?minPopulation=1000000&namePrefix=${value}`,
        geoApiOptions
      );
      const result = await response.json();
      return {
        options: result.data.map((city) => {
          console.log(city);
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name} ${city.countryCode}`,
          };
        }),
      };
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <AsyncPaginate
      placeholder="Search For City"
      debounceTimeout={600}
      value={search}
      onChange={handelOnChange}
      loadOptions={loadOption}
    />
  );
};

export default Search;
