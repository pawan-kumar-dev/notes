import React, { useState } from "react";
import { useLoginHooks } from "../hooks/useLoginHooks";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoading, error } = useLoginHooks();
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
    await login(formData.email, formData.password);
  };
  return (
    <form className="login" onSubmit={onSubmit}>
      <h3>Login</h3>
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
        Login
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
