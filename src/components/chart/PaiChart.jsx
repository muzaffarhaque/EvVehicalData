import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PaiChart = (props) => {
  const chartRef = useRef(null);

  useEffect(() => {
  
    const data = {
      labels: ["Consignment booked", "In Transit", "Out for delivery", "Delivered Successfully", "Within Time Limit", "Out of Time Limit"],
      datasets: [
   
        {
          data: [30, 70,],
          backgroundColor: ["#99CBE8", "#28AFFD"],
          hoverBackgroundColor: ["#99CBE8", "#28AFFD"],
          borderColor: "white", 
          borderWidth: 0,
          hoverBorderWidth:0,
          borderRadius:1,
          cutout: '50%',
        },
        // Second dataset for the outer arc
       
      ]
    };
    const ctx = chartRef.current.getContext("2d");


    const myDoughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        cutoutPercentage: 70,
        // cutout: '30%',
        responsive: true,
        maintainAspectRatio: false, 
        plugins:{
          legend:{
            display:false,
            position:'right',
            // align:'end',
            // maxWidth:'100',
            labels: {
              boxWidth: 14, 
              boxHeight: 7, 
              // borderWidth: 2, 
              // borderColor: 'black',
              useBorderRadius:true,
              borderRadius:5,
              textAlign:"start",
              color:'#fefcfc',
              font:{
                size:'6px',
                family:"'Roboto', sans-serif",
                weight:400,
                lineHeight:'7px'
              }
            },
           
          },
        },
       
      },
      plugins:[
        {
          id:"centerText",
          afterDatasetsDraw: (chart) => {
            const { ctx, width, height } = chart;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const text ="70%";
            const text2 ="Gole";
       
            const xcoor = chart.getDatasetMeta(0).data[0].x;
            const ycoor = chart.getDatasetMeta(0).data[0].y;

            ctx.font = `bold 16px sans-serif`;
            ctx.fillStyle = '#ffffff';
            ctx.fillText(text, xcoor, ycoor - 5);

            ctx.font = `400 6px sans-serif`;
            ctx.fillStyle = '#ffffff';
            ctx.fillText(text2, xcoor, ycoor + 15);
          },
        }
      ]
    
    });

  
    return () => {
      myDoughnutChart.destroy();
    };
  }, [props]);

  return (
    <div style={{ width: '100%', maxWidth: '500px',height : '100%' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};
PaiChart.defaultProps = {
  centerText:true,
  legend:false,
};
export default PaiChart;