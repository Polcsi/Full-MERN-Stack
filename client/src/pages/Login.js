import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/login", { email, password });
      sessionStorage.setItem("token", data.token);
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (err) {
      sessionStorage.removeItem("token");
      console.log(err);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const user = jwt(token);
      console.log(user);
      if (!user) {
        sessionStorage.removeItem("token");
        navigate("/login");
      } else {
        navigate("/dashboard");
      }
    }
  }, [navigate]);

  return (
    <div className="app">
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={loginUser}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="login" />
          <p>
            don't have an account? <Link to="/register">register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
