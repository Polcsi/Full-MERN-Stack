import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt from "jwt-decode";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/register", { name, email, password });
      setName("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (err) {
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
        <h1>Register</h1>
        <form onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <input type="submit" value="Register" />
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
