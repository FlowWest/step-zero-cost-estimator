import React, { useCallback, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, registerables, TooltipItem } from 'chart.js';
import { ConsolidationCostDetails } from '../../util/interfaces';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { sum } from 'lodash';
import { formatToUSD } from '../../util';

ChartJS.register(...registerables);
ChartJS.register(ChartDataLabels);

const doughnutColors = ['#22576B', '#306B99', '#83BBE5'];

const DoughnutChart = ({ chartData }: { chartData: ConsolidationCostDetails }) => {
  ChartJS.defaults.set('plugins.datalabels', {
    borderColor: '#000',
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: '#FAFAFA',
    anchor: 'start',
    color: '#000',
    textAlign: 'left',
    padding: 5,
    font: { size: 14, weight: 'bold' },
    formatter: function (value: any, context: any) {
      const label = context.chart.data.labels[context.dataIndex];
      const total = chartData.total;
      const pct = Math.floor((value / total) * 100);
      const pctStr = (value / total) * 100 === 0.0 ? '0%' : pct < 1 ? '< 1%' : `${pct}%`;

      return `${label}
      ${formatToUSD(value)}`;
    }
  });

  const chartRef = useRef(null);

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
    <>
      <Doughnut
        id={'consolidation-chart'}
        ref={chartRef}
        data={doughnutData}
        plugins={[ChartDataLabels]}
        options={{
          cutout: '65%',
          plugins: {
            legend: {
              display: false
              //labels: { usePointStyle: true, pointStyle: 'rectRounded' }
            },
            tooltip: {
              enabled: false,
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
    </>
  );
};

export default DoughnutChart;
