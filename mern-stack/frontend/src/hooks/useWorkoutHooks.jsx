import { useContext } from "react";
import { WorkoutContext } from "../context/workoutsContext";

const useWorkoutHooks = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw Error("Something went wrong");
  }
  return context;
};

export default useWorkoutHooks;
