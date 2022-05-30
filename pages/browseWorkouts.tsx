import React from 'react'
import Layout from '../components/layout'

const fetchWorkouts = (url: string) => axios.get(url).then((res) => res.data);

const browseWorkouts = () => {
  const { data, error } = useSWR(`/api/workouts`, fetchWorkouts);

  if (!data) {
    return <div>loading...</div>;
  }
  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen p-5 pt-8">
        <div className="text-2xl text-center font-extrabold">
          Browse our carefully curated workouts
        </div>
        <div className="text-md text-center font-light m-2">
          Thoughtfully designed workouts meant to push you to the absolute
          limits
        </div>
        <div className="grid lg:grid-cols-3 gap-5 mt-10 relative">
          {data.data.map((workout: Workout) => {
            return (
              <div>
                <img
                  object-fit="contain"
                  src="/images/signin.jpg"
                  alt="workout picture"
                  className="w-full object-fill p-3 rounded-2xl h-80"
                />
                <div>{workout.name}</div>
                <div>description</div>
              </div>
            ); // TODO: Need to add a description for each workout
          })}
        </div>
      </div>
    </Layout>
  );
};

export default browseWorkouts