"use client"
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  percentage: number;
  size?: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ percentage, size = 2 }) => {
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ['black', 'rgba(151, 141, 146, 0.37)'],
        borderColor: ['', ''],
        borderWidth: 0,
        borderRadius:1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%', // Increase to make the inner circle larger
    plugins: {
      tooltip: {
      },
      legend: { display: false },
    },
  };
  

  return (
    <div style={{ width: size, height: size}}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
