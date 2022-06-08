import React from 'react';
import Layout from '../components/layout';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ChartOptions,
  TimeScale,
  ChartData
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import axios from 'axios';
import useSWR from 'swr';
import { Exercise } from '@prisma/client';
import { ProgressAPIResponseType } from 'types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  TimeScale
);

export const options: ChartOptions<'line'> = {
  responsive: true,
  scales: {
    x: {
      type: 'time',
      time: {
        tooltipFormat: 'DD MM YYYY',
        unit: 'day',
        displayFormats: {
          hour: 'DD MM YYYY'
        }
      },
      grid: {
        display: true,
        drawBorder: true,
        drawOnChartArea: true,
        drawTicks: true,
        color: 'rgba(255, 255, 225,0.3)',
        borderColor: 'rgb(255, 255, 225,0.2)'
      },
      ticks: {
        color: 'rgb(255, 255, 225)',
        autoSkip: false
      }
    },
    y: {
      grid: {
        display: false,
        drawBorder: true,
        drawOnChartArea: false,
        drawTicks: false,
        borderColor: 'rgb(255, 255, 225)'
      },
      ticks: { color: 'rgb(255, 255, 225)' }
    }
  }
};

function choosingColor(name: string) {
  switch (name) {
    case 'Squat':
      return 'bg-red-700';
    case 'Lunges':
      return 'bg-green-700';
    case 'Jumping Jacks':
      return 'bg-blue-700';
    default:
      return 'bg-red-700';
  }
}

function createChartData(
  data: number[],
  labels: Date[]
): ChartData<'line', number[], Date> {
  return {
    labels: labels,
    datasets: [
      {
        data: data,
        borderColor: 'rgb(255, 255, 225)', //line color
        backgroundColor: 'rgb(255, 255, 225)', //data point
        cubicInterpolationMode: 'monotone'
      }
    ]
  };
}

const fetchExercisesById = (url: string) =>
  axios.get(url).then((res) => res.data);

const ProgressTest = () => {
  const { data: logsByExercise, error: logsByExerciseError } =
    useSWR<ProgressAPIResponseType>(
      `/api/progress`,
      fetchExercisesById
    );

  console.log(logsByExercise);
  // if (!logsByExercise) {
  //   return <div>loading...</div>;
  // }

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen p-5 pt-8">
        <div className="text-2xl font-extrabold">Progress</div>
        <>
          {logsByExercise?.map((log) => {
            const data = createChartData(log.data, log.labels);
            return (
              <div key={log.exercise.id}>
                <div className="m-4">
                  <Line
                    className={`${choosingColor(log.name)} p-5 rounded-md`}
                    options={options}
                    data={data}
                  />
                </div>
                <div className="flex justify-between m-4 px-4">
                  <div>{log.name}</div>
                  <div>Max {log.max}KG</div>
                </div>
              </div>
            );
          })}
        </>
      </div>
    </Layout>
  );
};

export default ProgressTest;
