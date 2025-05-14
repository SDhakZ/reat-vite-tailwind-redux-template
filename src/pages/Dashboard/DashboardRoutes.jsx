import { Routes, Navigate, Route } from "react-router-dom";
import ProjectSpace from "./ProjectSpace/ProjectSpace";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="project-space" replace />} />
      <Route path="project-space" element={<ProjectSpace />} />
    </Routes>
  );
};

export default DashboardRoutes;
