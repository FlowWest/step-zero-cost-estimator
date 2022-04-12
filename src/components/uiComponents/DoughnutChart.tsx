import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { WaterSystemState, ConsolidationCostDetails } from '../../util/interfaces';

ChartJS.register(...registerables);

const doughnutColors = ['#22576B', '#306B99', '#83BBE5'];

const DoughnutChart = ({ chartData }: { chartData: ConsolidationCostDetails }) => {
  console.log('chart data', chartData);
  const doughnutData = {
    labels: ['Material Costs', 'Administrative Costs', 'Adjustments'],
    datasets: [
      {
        label: 'Total Consolidation Costs',
        data: [
          chartData?.materialCosts?.total,
          chartData?.adminFees?.total,
          chartData?.adjustments?.total
        ],
        backgroundColor: doughnutColors,
        borderColor: doughnutColors,
        hoverOffset: 3
      }
    ]
  };
  return (
    <Doughnut
      data={doughnutData}
      options={{
        cutout: '65%',
        plugins: {
          legend: {
            labels: { usePointStyle: true, pointStyle: 'rectRounded' }
          }
          // tooltip: {
          //   callbacks: {
          //     label: (tooltipItem, data) => {
          //       var label = data.datasets[tooltipItem.datasetIndex].label || '';

          //       if (label) {
          //         label += ': ';
          //       }
          //       label += tooltipItem.yLabel;
          //       return '$' + label;
          //     }
          //   }
          // }
        }
      }}
    />
  );
};

export default DoughnutChart;
