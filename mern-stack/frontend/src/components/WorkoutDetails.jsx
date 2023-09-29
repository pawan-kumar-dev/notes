import React from "react";
import useWorkoutHooks from "../hooks/useWorkoutHooks";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import useAuthHooks from "../hooks/useAuthHooks";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutHooks();
  const { user } = useAuthHooks();
  const onDelete = async () => {
    console.log({ user });
    if (!user) return;
    const response = await fetch(
      `http://localhost:4000/api/workouts/${workout._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (Kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={onDelete}>
        Delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
