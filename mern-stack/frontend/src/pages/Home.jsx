import React from "react";
import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import useAuthHooks from "../hooks/useAuthHooks";
import useWorkoutHooks from "../hooks/useWorkoutHooks";

const Home = () => {
  const { workouts = [], dispatch } = useWorkoutHooks();
  const { user } = useAuthHooks();
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/workouts", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (response && response.ok) {
        const json = await response.json();
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    if (user) {
      fetchWorkouts();
    }
  }, [user]);
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
