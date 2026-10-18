import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="footer">
      <div className="footer__main">
        <div className="container">
          <div className="footer__content">
            {/* Company Info */}
            <div className="footer__section">
              <div className="footer__logo">
                <div className="logo">
                  <div className="logo__icon">☕</div>
                  <span className="logo__text">Coffee Beans</span>
                </div>
              </div>
              <p className="footer__description">
                Desarrollamos soluciones digitales a medida: aplicaciones web y
                móviles, software personalizado, plugins de WordPress y agentes
                de IA que impulsan el crecimiento de tu negocio.
              </p>
              <div className="footer__social">
                <a href="#" className="social-link" aria-label="Facebook">
                  <span className="social-icon">📘</span>
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <span className="social-icon">📸</span>
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <span className="social-icon">🐦</span>
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <span className="social-icon">💼</span>
                </a>
                <a href="#" className="social-link" aria-label="YouTube">
                  <span className="social-icon">📺</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer__section">
              <h3 className="footer__title">Enlaces Rápidos</h3>
              <ul className="footer__links">
                <li>
                  <button
                    onClick={() => scrollToSection("home")}
                    className="footer__link"
                  >
                    Inicio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("servicios")}
                    className="footer__link"
                  >
                    Servicios
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("proyectos")}
                    className="footer__link"
                  >
                    Proyectos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("resenas")}
                    className="footer__link"
                  >
                    Reseñas
                  </button>
                </li>
                {/* Secciones desactivadas en la página. Descomentar al reactivarlas. */}
                {/* <li>
                  <button
                    onClick={() => scrollToSection("blog")}
                    className="footer__link"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("tutoriales")}
                    className="footer__link"
                  >
                    Tutoriales
                  </button>
                </li> */}
              </ul>
            </div>

            {/* Services */}
            <div className="footer__section">
              <h3 className="footer__title">Servicios</h3>
              <ul className="footer__links">
                <li>
                  <button
                    onClick={() => scrollToSection("servicios")}
                    className="footer__link"
                  >
                    Desarrollo Web
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("servicios")}
                    className="footer__link"
                  >
                    Apps Móviles
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("servicios")}
                    className="footer__link"
                  >
                    Software Personalizado
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("servicios")}
                    className="footer__link"
                  >
                    Plugins de WordPress
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("servicios")}
                    className="footer__link"
                  >
                    Agentes de IA & Automatizaciones
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer__section">
              <h3 className="footer__title">Contacto</h3>
              <div className="footer__contact">
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <div className="contact-text">
                    <p>Trabajamos de forma remota</p>
                    <p>para clientes en todo el mundo</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <div className="contact-text">
                    <p>+52 55 1234 5678</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <div className="contact-text">
                    <p>hola@coffeebeans.dev</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">🕒</span>
                  <div className="contact-text">
                    <p>Lun - Vie: 9:00 - 18:00</p>
                    <p>Respuesta en menos de 24 h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-content">
            <div className="footer__copyright">
              <p>
                &copy; {currentYear} Coffee Beans. Todos los derechos
                reservados.
              </p>
            </div>

            <div className="footer__legal">
              <a href="#" className="legal-link">
                Política de Privacidad
              </a>
              <span className="divider">|</span>
              <a href="#" className="legal-link">
                Términos de Servicio
              </a>
              <span className="divider">|</span>
              <a href="#" className="legal-link">
                Cookies
              </a>
            </div>

            <div className="footer__badges">
              <div className="badge">
                <span className="badge-text">⚡ Desarrollo Ágil</span>
              </div>
              <div className="badge">
                <span className="badge-text">🚀 Tecnología Moderna</span>
              </div>
              <div className="badge">
                <span className="badge-text">🛠️ Soporte Continuo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        className="back-to-top"
        onClick={() => scrollToSection("home")}
        aria-label="Volver arriba"
      >
        ↑
      </button>
    </footer>
  );
};

export default Footer;
