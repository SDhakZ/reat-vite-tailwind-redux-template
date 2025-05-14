import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/layout";
import { config } from "@fortawesome/fontawesome-svg-core";
import DashboardRoutes from "./pages/Dashboard/DashboardRoutes";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Login from "./pages/Auth/Login";
import RequireAuth from "./components/RequireAuth";
config.autoAddCss = false;
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
        </Route>
      </Route>

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
