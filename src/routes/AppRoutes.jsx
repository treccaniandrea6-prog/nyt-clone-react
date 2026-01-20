import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Section from "../pages/Section";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/section/:sectionId" element={<Section />} />

      {/* Fallback: any unknown route goes to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;