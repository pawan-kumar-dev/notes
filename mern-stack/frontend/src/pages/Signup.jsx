import React, { useState } from "react";
import { useSignupHooks } from "../hooks/useSignupHooks";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { signup, isLoading, error } = useSignupHooks();
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
    await signup(formData.email, formData.password);
  };
  return (
    <form className="signup" onSubmit={onSubmit}>
      <h3>Sign up</h3>
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={onChange}
      />
      <button type="submit" disabled={isLoading}>
        Sign up
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
