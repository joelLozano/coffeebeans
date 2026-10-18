import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquear el scroll del fondo mientras el menú móvil está abierto
  // para que se sienta como una pantalla de app.
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    // Si no estamos en la página principal, navegar primero
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigationItems = [
    { id: "home", label: "Home", type: "scroll" },
    { id: "servicios", label: "Servicios", type: "scroll" },
    { id: "proyectos", label: "Proyectos", type: "scroll" },
    { id: "resenas", label: "Reseñas", type: "scroll" },
    // Secciones desactivadas en la página. Descomentar al reactivarlas.
    // { id: "blog", label: "Blog", type: "scroll" },
    // { id: "tutoriales", label: "Tutoriales", type: "scroll" },
    // { id: "/nosotros", label: "Nosotros", type: "route" },
  ];

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      <div className="container">
        <div className="header__content">
          {/* Logo */}
          <div className="header__logo">
            <div className="logo">
              <div className="logo__icon">☕</div>
              <span className="logo__text">Coffee Beans</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="header__nav">
            <ul className="nav-list">
              {navigationItems.map((item) => (
                <li key={item.id} className="nav-item">
                  <button
                    onClick={() =>
                      item.type === "route"
                        ? handleNavigation(item.id)
                        : scrollToSection(item.id)
                    }
                    className="nav-link"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button */}
          <div className="header__cta">
            <button
              onClick={() => handleNavigation("/contacto")}
              className="btn btn-primary"
            >
              Contactar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir menú"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* El menú móvil se renderiza en un portal al body para que el
          backdrop-filter del header no limite su posicionamiento fixed. */}
      {createPortal(
        <>
          {/* Backdrop oscuro para el menú móvil */}
          <div
            className={`mobile-nav-backdrop ${
              isMobileMenuOpen ? "mobile-nav-backdrop--visible" : ""
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile Navigation - panel deslizante tipo app */}
          <nav
            className={`mobile-nav ${
              isMobileMenuOpen ? "mobile-nav--open" : ""
            }`}
            aria-hidden={!isMobileMenuOpen}
          >
            <div className="mobile-nav__header">
              <div className="logo">
                <div className="logo__icon">☕</div>
                <span className="logo__text">Coffee Beans</span>
              </div>
              <button
                className="mobile-nav__close"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                ✕
              </button>
            </div>

            <ul className="mobile-nav-list">
              {navigationItems.map((item) => (
                <li key={item.id} className="mobile-nav-item">
                  <button
                    onClick={() =>
                      item.type === "route"
                        ? handleNavigation(item.id)
                        : scrollToSection(item.id)
                    }
                    className="mobile-nav-link"
                  >
                    {item.label}
                    <span className="mobile-nav-link__arrow">›</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mobile-nav__footer">
              <button
                onClick={() => handleNavigation("/contacto")}
                className="btn btn-primary mobile-cta"
              >
                Contactar
              </button>
            </div>
          </nav>
        </>,
        document.body
      )}
    </header>
  );
};

export default Header;
