import { useState, createContext, useContext } from "react";
export interface contextValues {
  setWorkoutForTheDay: (value: String) => void;
  daysWorkout: String;
}
export const WorkoutContext = createContext<contextValues | null>(null);

type props = {
  children: React.ReactNode;
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);

  if (context === null) {
    throw new Error("useWorkout must be used within a SocketProvider");
  }
  return context;
};

const WorkoutProvider = ({ children }: props) => {
  const [daysWorkout, setDaysWorkout] = useState<String>("1");
  const setWorkoutForTheDay = (value: String) => {
    setDaysWorkout(value);
    console.log({ value });
  };
  return (
    <WorkoutContext.Provider value={{ daysWorkout, setWorkoutForTheDay }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export { WorkoutProvider };
