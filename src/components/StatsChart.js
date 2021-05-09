import React, { useEffect, useState, useRef } from "react";
import { Chart, registerables } from "chart.js";
import styled from "styled-components";

const StyledChart = styled.div`
  height: 400px;
  width: 300px;
`;

const StatsChart = ({ statsData }) => {
  Chart.register(...registerables);
  let stats = [];
  let statNames = [];
  let ctx;
  const chartRef = useRef();

  const [visibility, setVisibility] = useState("hidden");
  const toggle = () => {
    setVisibility(visibility === "hidden" ? "visible" : "hidden");
    console.log(visibility);
  };

  useEffect(() => {
    ctx = document.getElementById("myChart").getContext("2d");
  }, []);

  useEffect(() => {
    statsData.forEach((item, index) => {
      stats.push(item.base_stat);
      statNames.push(item.stat.name);
    });
    console.log(stats);
    if (stats.length > 0) {
      const myChart = new Chart(ctx, {
        type: "bar",
        options: {
          indexAxis: "y",
          legend: {
            display: false,
          },
          maintainAspectRatio: false,
        },
        data: {
          labels: statNames,
          datasets: [
            {
              data: stats,
              label: "Stats",
              backgroundColor: "#70B8B2",
              borderColor: "#000000",
              borderWidth: "1",
            },
          ],
        },
      });
    }
  }, [statsData]);

  return (
    <div>
      <button class="btn" onClick={toggle}>
        Toggle Stats
      </button>
      <StyledChart className={visibility}>
        <canvas ref={chartRef} id="myChart"></canvas>
      </StyledChart>
    </div>
  );
};

export default StatsChart;
