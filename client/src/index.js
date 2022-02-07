import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// style sheets
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="*"
          element={
            <main>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
