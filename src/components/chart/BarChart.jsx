import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChart = ({ info }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: ["January", "February", "March", "April", "May", "June",'july','Aug','Sep','Oct',"Dec"],
   
      // labels: ["AP_VIJ-Sri Sai Direct", "AP_VIJ-Sri Sai Direct", "AP_VIJ-Sri Sai Direct", "AP_VIJ-Sri Sai Direct", "AP_VIJ-Sri Sai Direct", "AP_VIJ-Sri Sai Direct"],
      datasets: [
        {
        //   data: info.dataBar,
          data: [800, 2500, 1400, 1500, 1200, 1200,300,500,1000,900,1200],
          // data: info.data,
          backgroundColor: [
            "#7294ff",
            "#7294ff",
            "#7294ff",
            "#7294ff",
            "#7294ff",
            "#7294ff",
          ],
          hoverBackgroundColor: [
            "#7294ff",
            "#7294ff",
            "#7294ff",
            "#7294ff",
            "#7294ff",
            "#7294ff",
          ],
          // borderRadius: 50,
        //   barThickness: 24,
          borderRadius: 25,
          borderSkipped:false,
        },

      ],
    };

    const ctx = chartRef.current.getContext("2d");

    const myBarChart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        cutoutPercentage: 40,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            position: "top",
          },
        },
        scales: {
          x: {
            type: "category",
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)", // Color of vertical grid lines
            },
          },
          y: {
            display: true,
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)", // Color of horizontal grid lines
            },
          },
        },
      },
    });
    return () => {
      myBarChart.destroy();
    };
  }, [info]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BarChart;
