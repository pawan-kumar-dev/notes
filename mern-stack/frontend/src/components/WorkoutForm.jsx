import React from "react";
import { useState } from "react";
import useAuthHooks from "../hooks/useAuthHooks";
import useWorkoutHooks from "../hooks/useWorkoutHooks";

const WorkoutForm = () => {
  const [formData, setFormData] = useState({ title: "", load: "", reps: "" });
  const { dispatch } = useWorkoutHooks();
  const { user } = useAuthHooks();
  const [error, setError] = useState("");
  const [emptyField, setEmptyField] = useState([]);
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be loggedIn");
      return;
    }
    const response = await fetch("http://localhost:4000/api/workouts", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const jsonData = await response.json();
    if (!response.ok) {
      setError(jsonData.error);
      setEmptyField(jsonData.emptyField || []);
    }
    if (response.ok) {
      setError("");
      setEmptyField([]);
      setFormData({ title: "", load: "", reps: "" });
      dispatch({ type: "CREATE_WORKOUT", payload: jsonData });
    }
  };
  return (
    <form className="create" onSubmit={onSubmit}>
      <h3>Add a workout</h3>
      <label>Excersize title: </label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={onChange}
        className={emptyField.includes("title") ? "error" : ""}
      />
      <label>Load in (KG): </label>
      <input
        type="number"
        name="load"
        value={formData.load}
        onChange={onChange}
        className={emptyField.includes("load") ? "error" : ""}
      />
      <label>Reps: </label>
      <input
        type="number"
        name="reps"
        value={formData.reps}
        onChange={onChange}
        className={emptyField.includes("reps") ? "error" : ""}
      />
      <button type="submit">Add workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
