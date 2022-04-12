import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const dummyData = [
  {
    id: 1,
    year: 2018,
    userGain: 800,
    userLost: 1234
  },
  {
    id: 2,
    year: 2019,
    userGain: 900,
    userLost: 298
  },
  {
    id: 3,
    year: 2020,
    userGain: 745,
    userLost: 6234
  },
  {
    id: 4,
    year: 2021,
    userGain: 500,
    userLost: 134
  },
  {
    id: 5,
    year: 2022,
    userGain: 769,
    userLost: 93
  }
];

const BarChart = () => {
  const [userData, setUserData] = useState({
    labels: dummyData.map((item) => item.year),
    datasets: [
      {
        label: 'Users Gained',
        data: dummyData.map((item) => item.userGain)
      }
    ]
  });
  return <Bar data={userData} />;
  // return <p>nnm</p>;
};

export default BarChart;
