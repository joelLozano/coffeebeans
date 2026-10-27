import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import Projects from "../components/sections/Projects";
import Reviews from "../components/sections/Reviews";
import { PAGES } from "../seo/site";
import { usePageMeta } from "../seo/usePageMeta";
// Sección de Blog desactivada temporalmente. Descomentar para reactivar en el futuro.
// import Blog from "../components/sections/Blog";

const HomePage: React.FC = () => {
  usePageMeta(PAGES.home);

  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Reviews />
        {/* Sección de Blog desactivada temporalmente. Descomentar para reactivar. */}
        {/* <Blog /> */}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
