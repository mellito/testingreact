import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [user, setUser] = useState({});

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      setUser(data);
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="container">
      <span>{user.name}</span>
      <form action="">
        <input
          name="username"
          type="text"
          placeholder="username"
          value={formValue.username}
          onChange={handlechange}
        />
        <input
          name="password"
          type="password"
          id=""
          placeholder="password"
          value={formValue.pasword}
          onChange={handlechange}
        />
        <button
          disabled={!formValue.username || !formValue.password}
          onClick={handleClick}
        >
          Login
        </button>
        <span
          data-testid="error"
          style={{ visibility: error ? "visible" : "hidden" }}
        >
          Something went wrong
        </span>
      </form>
    </div>
  );
};

export default Login;
