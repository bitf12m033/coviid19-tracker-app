import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
// import styles from "./Chart.module.css";

const Chart = ({ country }) => {
  const [dailyData, setDailyData] = useState([]);

   useEffect(() => {
      async function fetchDailyData(){
          // setdataLoading(true);
          const apiResponse = await fetch('https://api.thevirustracker.com/free-api?countryTimeline='+country);
          // console.log(apiResponse);
          const countryTimeline = await apiResponse.json();
          const timelineitems = countryTimeline.timelineitems[0];
          const timelineitemsIds = Object.keys(timelineitems);
          setDailyData(timelineitemsIds.map((timelineitemsId )=>(
                {
                  confirmed: timelineitems[timelineitemsId].total_cases,
                  deaths: timelineitems[timelineitemsId].total_deaths,
                  recovered: timelineitems[timelineitemsId].total_recoveries,
                  date: timelineitemsId,
                }
            )));
          console.log(countryTimeline.timelineitems[0]['']);
      }
      fetchDailyData();      
  }, [country]);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true,
          },
          {
            data: dailyData.map(({ recovered }) => recovered),
            label: "Recovered",
            borderColor: "green",
            backgroundColor: "rgb(50,205,50,0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

 /* const barChart = dailyData.length ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths", "Active"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
              "rgba(242, 234, 0, 0.5)",
            ],
            hoverBackgroundColor: [
              "rgba(0, 77, 153)",
              "rgba(30, 102, 49)",
              "rgba(255, 51, 51)",
              "rgba(204, 153, 0)",
            ],
            data: [
              dailyData.map(({ confirmed }) => confirmed),
              dailyData.map(({ recovered }) => recovered),
              dailyData.map(({ deaths }) => deaths),
              // confirmed.value - (recovered.value + deaths.value),
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;
*/
  return (
    <div>{country ?lineChart:''}</div>
  );
};

export default Chart;