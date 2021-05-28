import React, { useEffect, useState, useRef } from "react";
import { Chart, registerables } from "chart.js";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import { render } from "@testing-library/react";

const StyledChart = styled.div`
  height: 300px;
  width: 300px;
  background-color: #f1f1f1;
`;

const StatsChart = ({ statsData, pokemonName }) => {
  let testName = useParams().name;
  Chart.register(...registerables);
  let stats = [];
  let statNames = [];
  let targetStats = [];
  let targetStatNames = [];
  let targetChart;
  let myChart = false;
  let ctx;
  let targetctx;
  let targetSearchName;
  const chartRef = useRef();
  const targetChartRef = useRef();

  const [chartGridStyle, setChartGridStyle] = useState("grid-1");
  const [visibility, setVisibility] = useState("hidden");
  const [comparison, setComparison] = useState(false);
  const toggle = () => {
    setVisibility(visibility === "hidden" ? "visible" : "hidden");
    console.log(visibility, pokemonName, statsData, testName);
    renderBaseChart();
  };

  const toggleCompare = () => {
    setComparison(!comparison);
    setChartGridStyle(chartGridStyle === "grid-1" ? "grid-2" : "grid-1");
    console.log(comparison);
  };

  const setTargetSearch = (e) => {
    targetSearchName = e.target.value;
  };

  const renderComparison = (e) => {
    if (targetChart) {
      targetChart.destroy();
    }
    e.preventDefault();
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${targetSearchName}/`)
      .then((response) => {
        targetStatNames = [];
        targetStats = [];
        response.data.stats.forEach((element, index) => {
          targetStats.push(element.base_stat);
          targetStatNames.push(element.stat.name);
        });
      })
      .then(() => {
        console.log(targetStats, targetStatNames);
        targetctx = document.querySelector("#targetChart").getContext("2d");
      })
      .then(() => {
        if (targetChart) {
          targetChart.destroy();
        }
        targetChart = new Chart(targetctx, {
          type: "bar",
          options: {
            indexAxis: "y",
            legend: {
              display: false,
            },
            maintainAspectRatio: false,
          },
          data: {
            labels: targetStatNames,
            datasets: [
              {
                data: targetStats,
                label: targetSearchName,
                backgroundColor: "#D46B47",
                borderColor: "#000000",
                borderWidth: "1",
              },
            ],
          },
        });
        setChartGridStyle("grid-2");
      })
      .catch((error) => {
        console.log(error);
        setComparison(false);
      });
  };

  useEffect(() => {
    if (myChart) {
      myChart.destroy();
    }
    ctx = document.getElementById("myChart").getContext("2d");
  }, [testName]);

  const renderBaseChart = () => {
    if (myChart) {
      myChart.destroy();
    }
    console.log(typeof myChart);
    statsData.forEach((item, index) => {
      stats.push(item.base_stat);
      statNames.push(item.stat.name);
    });

    if (stats.length > 0) {
      myChart = new Chart(ctx, {
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
              label: pokemonName,
              backgroundColor: "#70B8B2",
              borderColor: "#000000",
              borderWidth: "1",
            },
          ],
        },
      });
    }
    console.log(typeof myChart);
  };
  useEffect(() => {
    renderBaseChart();
  }, [testName]);

  return (
    <div>
      <button class="btn" onClick={toggle}>
        Toggle Stats
      </button>
      <button onClick={toggleCompare} class="btn">
        Compare Base Stats
      </button>
      {comparison && (
        <div>
          <form onSubmit={renderComparison}>
            <input
              placeholder="Comparison Pokemon"
              onChange={setTargetSearch}
            />
            <button type="submit" onClick={renderComparison}>
              Compare Pokemon
            </button>
          </form>
        </div>
      )}
      <div className={chartGridStyle}>
        <StyledChart className={visibility}>
          <canvas ref={chartRef} id="myChart"></canvas>
        </StyledChart>

        {comparison && (
          <div>
            <StyledChart>
              <canvas ref={targetChartRef} id="targetChart"></canvas>
            </StyledChart>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsChart;
