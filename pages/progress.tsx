import React from "react";
import Layout from "../components/layout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TimeScale,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";

import axios from "axios";
//const fetcher = url => axios.get(url).then(res => res.data)

const workoutData = [
  { date: "2022-04-11 12:35:55.268272", workout: "squat", weight: 10, sets: 3 },
  { date: "2022-04-13 21:35:55.268272", workout: "squat", weight: 9, sets: 3 },
  { date: "2022-04-15 14:35:55.268272", workout: "squat", weight: 12, sets: 3 },
  { date: "2022-04-21 12:35:55.268272", workout: "squat", weight: 13, sets: 3 },
];
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  TimeScale
);

export const options: ChartOptions<"line"> = {
  responsive: true,
  scales: {
    x: {
      type: "time",
      time: {
        tooltipFormat: "DD MM YYYY",
        unit: "day",
        displayFormats: {
          hour: "DD MM YYYY",
        },
      },
      grid: {
        display: true,
        drawBorder: true,
        drawOnChartArea: true,
        drawTicks: true,
        color: "rgba(255, 255, 225,0.3)",
        borderColor: "rgb(255, 255, 225,0.2)",
      },
      ticks: {
        color: "rgb(255, 255, 225)",
        autoSkip: false,
        // callback: function (value, index, values) {
        //   console.log({value, index, values})
        //   return moment(value).format("DD MM");
        // },
        // callback: function (value, index, ticks) {
        //   console.log({value})
        //   return "$" + value;
        // },
      },
    },
    y: {
      grid: {
        display: false,
        drawBorder: true,
        drawOnChartArea: false,
        drawTicks: false,
        borderColor: "rgb(255, 255, 225)",
      },
      ticks: { color: "rgb(255, 255, 225)" },
    },
  },
};

//const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data: ChartData<"line", number[], Date> = {
  labels: workoutData.map((label) => {
    console.log({ label });
    // return `${new Date(label.date).getDate()}/${new Date(label.date).getMonth()+1}`;
    return new Date(label.date);
  }),
  datasets: [
    {
      data: workoutData.map((weight) => weight.weight * weight.sets),
      borderColor: "rgb(255, 255, 225)", //line color
      backgroundColor: "rgb(255, 255, 225)", //data point
      cubicInterpolationMode: "monotone",
    },
  ],
};

console.log({ data, options, workoutData });
const progress = () => {
  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen p-5 pt-8">
        <div className="text-2xl font-extrabold">Progress</div>
        {/* Chart */}
        <div className="m-4">
          <Line
            className="bg-red-700 p-5 rounded-md"
            options={options}
            data={data}
          />
        </div>
        <div className="flex justify-between m-4 px-4">
          <div>Squat</div>
          <div>50 kg</div>
        </div>
      </div>
    </Layout>
  );
};

export default progress;
