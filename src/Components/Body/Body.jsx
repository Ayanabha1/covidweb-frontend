import React, { useEffect, useState } from "react";
import { useDataLayerValue } from "../../Datalayer/DataLayer";
import "./body.css";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { chart as ChartJS } from "chart.js/auto";
function Body() {
  const [{ covidData, searchRes, searchClicked }] = useDataLayerValue();
  const [selectedItems, setSelectedItems] = useState([]);
  const BaseURL = "http://localhost:8000";
  const [showGraph, setShowGraph] = useState(false);
  const [graphData, setgraphData] = useState({
    labels: [],
    datasets: [],
  });

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const getCountryData = async (country) => {
    var d = new Date();
    const to_date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    d.setMonth(d.getMonth() - 1);
    const from_date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    var _data = [];
    await axios
      .get(BaseURL + `/data/country/${country}/${from_date}/${to_date}`)
      .then((data) => {
        _data = data.data;
        return _data;
      })
      .catch((err) => console.log(err));
    return _data;
  };
  getCountryData();

  const selectRow = async (e, index) => {
    const row = e.target.parentNode;
    console.log(row);
    if (row.classList.contains("selected-table-row")) {
      row.classList.remove("selected-table-row");
      setSelectedItems(
        selectedItems.filter(
          (item) => item.country.ID !== covidData?.countryData[index].ID
        )
      );

      setgraphData((state) => ({
        ...state,
        datasets: graphData.datasets.filter(
          (item) => item.label !== covidData?.countryData[index].Country
        ),
      }));
      // console.log(graphData.datasets.length);
      if (graphData.datasets.length === 1) {
        setShowGraph(false);
      }
    } else {
      row.classList.add("selected-table-row");
      const _data = await getCountryData(covidData?.countryData[index].Country);
      const selected_country_data = {
        country: covidData?.countryData[index],
        data: _data,
      };
      setSelectedItems((state) => [...state, selected_country_data]);

      if (graphData.labels.length === 0) {
        setgraphData((state) => ({
          ...state,
          labels: selected_country_data.data.map((item) => {
            const date = new Date(item.Date);
            const options = { month: "short", day: "numeric" };
            return date.toLocaleDateString("en-US", options);
          }),
        }));
      }

      const newDataset = {
        label: selected_country_data.country.Country,
        data: selected_country_data.data.map((item) => item.Cases),
        borderColor: [getRandomColor()],
        borderWidth: 1,
      };

      setgraphData((state) => ({
        ...state,
        datasets: [...state.datasets, newDataset],
      }));

      setShowGraph(true);
    }
  };

  return (
    <div className="Body">
      <div className="body-container">
        <div className="body-top">
          <div className="top-banner">
            <div className="top-banner-content">
              <p>Stay updated with the latest Covid data</p>
            </div>
          </div>
          <div className="global-stats">
            <div className="global-stat">
              <div className="stat-card">
                <div className="stat-nums">
                  {covidData?.globalData.TotalConfirmed}
                </div>
                <p>Total Confirmed</p>
              </div>
            </div>
            <div className="global-stat">
              <div className="stat-card">
                <div className="stat-nums">
                  {covidData?.globalData.TotalDeaths}
                </div>
                <p>Total Deaths</p>
              </div>
            </div>
            <div className="global-stat">
              <div className="stat-card">
                <div className="stat-nums">
                  {covidData?.globalData.TotalRecovered}
                </div>
                <p>Total Recorvered</p>
              </div>
            </div>
          </div>
        </div>
        <div className="body-bottom">
          <div className="table-container">
            <div className="table-content">
              <table>
                <thead>
                  <tr>
                    <th>Country</th>
                    <th>Total Confirmed</th>
                    <th>Total Deaths</th>
                    <th>Total Recovered</th>
                  </tr>
                </thead>
                <tbody>
                  {!searchClicked
                    ? covidData?.countryData.map((data, i) => (
                        <tr
                          key={i}
                          onClick={(e) => {
                            selectRow(e, covidData?.countryData.indexOf(data));
                          }}
                        >
                          <td>{data.Country}</td>
                          <td>{data.TotalConfirmed}</td>
                          <td>{data.TotalDeaths}</td>
                          <td>{data.TotalRecovered}</td>
                        </tr>
                      ))
                    : searchRes?.map((data, i) => (
                        <tr
                          key={i}
                          onClick={(e) => {
                            selectRow(e, covidData?.countryData.indexOf(data));
                          }}
                        >
                          <td>{data.Country}</td>
                          <td>{data.TotalConfirmed}</td>
                          <td>{data.TotalDeaths}</td>
                          <td>{data.TotalRecovered}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
          <div
            className={`graph-container ${showGraph && "graph-container-show"}`}
          >
            <div className="graph-content">
              {showGraph && <Line data={graphData} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
