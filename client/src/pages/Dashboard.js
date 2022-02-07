import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [dashboardData, setDashboardData] = useState("");
  const navigate = useNavigate();

  async function getDashboardData(token) {
    try {
      const { data } = await axios.get("/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDashboardData(data);
    } catch (err) {
      console.log(err);
      navigate("/login");
      sessionStorage.removeItem("token");
    }
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const user = jwt(token);
      setUserData(user);
      if (!user) {
        sessionStorage.removeItem("token");
        navigate("/login");
      } else {
        getDashboardData(token);
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="dashboard">
      <nav>
        <div className="nav-header">
          Hi, <br></br>
          {userData.name}!
        </div>
        <ul>
          <li>
            <button
              className="logout-btn"
              onClick={() => {
                sessionStorage.removeItem("token");
                navigate("/login");
              }}
            >
              logout
            </button>
          </li>
        </ul>
      </nav>
      <div className="content">{dashboardData.msg}</div>
    </div>
  );
};

export default Dashboard;
