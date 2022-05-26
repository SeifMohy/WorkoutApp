// import React from "react";
// import Layout from "../components/layout";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   ChartOptions,
//   TimeScale,
//   ChartData,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import "chartjs-adapter-moment";
// import axios, { AxiosRequestConfig } from "axios";
// import useSWR from "swr";
// import { WorkoutLine, UserLog } from "@prisma/client";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   TimeScale
// );

// export const options: ChartOptions<"line"> = {
//   responsive: true,
//   scales: {
//     x: {
//       type: "time",
//       time: {
//         tooltipFormat: "DD MM YYYY",
//         unit: "day",
//         displayFormats: {
//           hour: "DD MM YYYY",
//         },
//       },
//       grid: {
//         display: true,
//         drawBorder: true,
//         drawOnChartArea: true,
//         drawTicks: true,
//         color: "rgba(255, 255, 225,0.3)",
//         borderColor: "rgb(255, 255, 225,0.2)",
//       },
//       ticks: {
//         color: "rgb(255, 255, 225)",
//         autoSkip: false,
//       },
//     },
//     y: {
//       grid: {
//         display: false,
//         drawBorder: true,
//         drawOnChartArea: false,
//         drawTicks: false,
//         borderColor: "rgb(255, 255, 225)",
//       },
//       ticks: { color: "rgb(255, 255, 225)" },
//     },
//   },
// };


// const userId = "1";
// const fetchUserLogById = (url: string) =>
//   axios.get(url).then((res) => res.data);
// const fetchExercises = (url: string) => axios.get(url).then((res) => res.data);

// const { data: userLog, error: userLogError } = useSWR(
//   `/api/workouts/${userId}`,
//   fetchUserLogById
// );
// const { data: exercises, error: exerciseError } = useSWR(
//   `/api/workouts`,
//   fetchExercises
// );

// console.log(userLog);
// console.log(exercises);

// for (const exercise of Array.from(exercises)) {
//   //return graph data
//   const userExercise = userLog.filter((log: any) => {
//     //TODO: Amend Type
//     console.log(log);
//     return log.workoutLine.exerciseId === exercise.id;
//   });
//   console.log(userExercise);
//   const data: ChartData<"line", number[], Date> = {
//     labels: userExercise.map((log: any) => {
//       //TODO: Amend Type
//       return new Date(log.date);
//     }),
//     datasets: [
//       {
//         data: userExercise.map((log: any) => log.weight * log.reps),
//         borderColor: "rgb(255, 255, 225)", //line color
//         backgroundColor: "rgb(255, 255, 225)", //data point
//         cubicInterpolationMode: "monotone",
//       },
//     ],
//   };
//   console.log({ data, options });

//   // if (!userLog || !exercises) {
//   //   return <div>loading...</div>;
//   // }

// const progress = () => {
//   return (
//     <Layout>
//       <div className="bg-gray-100 min-h-screen p-5 pt-8">
//         <div className="text-2xl font-extrabold">Progress</div>
//         {/* Chart */}
//         <div className="m-4">
//           <Line
//             className="bg-red-700 p-5 rounded-md"
//             options={options}
//             data={data}
//           />
//         </div>
//         <div className="flex justify-between m-4 px-4">
//           <div>Squat</div>
//           <div>50 kg</div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default progress;
