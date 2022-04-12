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
        hoverOffset: 8
      }
    ]
  };
  return (
    <Doughnut
      data={doughnutData}
      options={{
        cutout: '70%',
        plugins: {
          legend: {
            labels: { usePointStyle: true, pointStyle: 'rectRounded' }
          }
        }
      }}
    />
  );
};

export default DoughnutChart;
