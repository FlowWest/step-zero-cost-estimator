import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, registerables, TooltipItem } from 'chart.js';
import { ConsolidationCostDetails } from '../../util/interfaces';

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
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem: TooltipItem<'doughnut'>) => {
                const { label, formattedValue } = tooltipItem;

                return `${label}: $${formattedValue}`;
              }
            }
          }
        }
      }}
    />
  );
};

export default DoughnutChart;
