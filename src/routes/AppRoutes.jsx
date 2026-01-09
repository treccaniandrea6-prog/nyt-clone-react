import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Section from "../pages/Section";
import Article from "../pages/Article";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/section/:sectionId" element={<Section />} />
      <Route path="/article/:encodedUrl" element={<Article />} />

      {/* Fallback: any unknown route goes to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
