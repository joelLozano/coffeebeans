import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogPostDetail from "./pages/BlogPostDetail";
// Página "Nosotros" desactivada temporalmente. Descomentar para reactivar.
// import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import "./styles/globals.css";
import "./App.css";

// Deriva el basename del router desde la base de Vite (import.meta.env.BASE_URL,
// p. ej. "/coffeebeans/"), sin la barra final que el router no espera.
const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

const App: React.FC = () => {
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<BlogPostDetail />} />
        {/* Ruta "Nosotros" desactivada temporalmente. Descomentar junto con el import para reactivar. */}
        {/* <Route path="/nosotros" element={<AboutPage />} /> */}
        <Route path="/contacto" element={<ContactPage />} />
      </Routes>
    </Router>
  );
};

export default App;
