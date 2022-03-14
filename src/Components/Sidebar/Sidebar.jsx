import React, { useEffect, useState } from "react";
import "./sidebar.css";
import axios from "axios";
import { useDataLayerValue } from "../../Datalayer/DataLayer";
function Sidebar() {
  const sideBarNavOptions = [
    "Dashboard",
    "Lorem, ipsum.",
    "Lorem, ipsum.",
    "Lorem, ipsum.",
    "Lorem, ipsum.",
    "Lorem, ipsum.",
    "Lorem, ipsum.",
    "Lorem, ipsum.",
  ];
  const [clickedOption, setClickedOption] = useState(0);
  // const [{ covidData }] = useDataLayerValue();

  return (
    <div className="Sidebar">
      <div className="sidebar-container">
        <div className="sidebar-user-profile">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt=""
          />
          <p>R3X</p>
        </div>
        <div className="sidebar-nav">
          <p>Navigation</p>
          <ul className="side-nav-list">
            {sideBarNavOptions.map((side_op, i) => (
              <li
                key={i}
                className={`${clickedOption === i && "nav-option-clicked"}`}
                onClick={(e) => {
                  setClickedOption(i);
                }}
              >
                {side_op}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
