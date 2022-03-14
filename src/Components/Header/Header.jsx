import React, { useState, useEffect } from "react";
import "./header.css";
import { useDataLayerValue } from "../../Datalayer/DataLayer";
function Header() {
  const [{ covidData, searchShow }, dispatch] = useDataLayerValue();
  const [searchRes, setSearchRes] = useState([]);
  const [searchItemValue, setSearchItemValue] = useState("");

  const findResult = (e) => {
    const searchItem = e.target.value;
    setSearchItemValue(e.target.value);
    dispatch({
      type: "SET_SEARCH_CLICKED",
      searchClicked: false,
    });

    const matchesFilter = covidData?.countryData.filter((data) => {
      if (searchItem === "") {
        dispatch({
          type: "SET_SEARCH_SHOW",
          searchShow: false,
        });
        return data;
      } else if (
        data.Country.toLowerCase().includes(searchItem.toLowerCase())
      ) {
        dispatch({
          type: "SET_SEARCH_SHOW",
          searchShow: true,
        });
        return data.Country;
      }
    });
    dispatch({
      type: "SET_SEARCH_RES",
      searchRes: matchesFilter,
    });
    setSearchRes(matchesFilter.map((data) => data));
  };
  const searchClicked = () => {
    dispatch({
      type: "SET_SEARCH_CLICKED",
      searchClicked: true,
    });
  };
  return (
    <div className="Header">
      <div className="header-container">
        <div className="logo header-child">
          <h2>Logo</h2>
        </div>
        <div className="searchBar header-child">
          <div className="search-inp-container">
            <input
              type="text"
              placeholder="Search for countries"
              value={searchItemValue}
              onChange={(e) => findResult(e)}
            />
            <div className="search-hint">
              <div
                className={`search-hint-container ${
                  searchShow && "search-hint-container-show"
                }`}
              >
                {searchRes?.map((data) => (
                  <div
                    onClick={(e) => {
                      setSearchItemValue([data.Country]);
                      setSearchRes([data]);
                      dispatch({
                        type: "SET_SEARCH_SHOW",
                        searchShow: false,
                      });
                    }}
                  >
                    <p>{data.Country}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="search-btn"
            onClick={() => {
              searchClicked();
            }}
          >
            Search
          </div>
        </div>
        <div className="header-user-profile header-child">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt=""
          />
          <p>R3X</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
