import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import { Chart, registerables } from "chart.js";

const StatsChart = ({ statsData }) => {
  Chart.register(...registerables);
  let stats = [];
  let statNames = [];
  let ctx;
  const chartRef = useRef();

  useEffect(() => {
    ctx = document.getElementById("myChart").getContext("2d");
  }, []);

  useEffect(() => {}, [stats]);

  //   const ctx = document.querySelector("#myChart").getContext("2d");

  useEffect(() => {
    console.log(statsData);

    statsData.forEach((item, index) => {
      stats.push(item.base_stat);
      statNames.push(item.stat.name);
    });
    console.log(stats);
    if (stats.length > 0) {
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: statNames,
          datasets: [
            {
              label: "Stats",
              data: stats,
            },
          ],
        },
      });
    }
  }, [statsData]);

  return <canvas ref={chartRef} id="myChart"></canvas>;
};

export default StatsChart;
