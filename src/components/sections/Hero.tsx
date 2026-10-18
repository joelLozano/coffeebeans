import React from "react";
import "./Hero.css";

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero__background">
        <div className="hero__particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle--${(i % 3) + 1}`}></div>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="hero__content">
          <div className="hero__text">
            <h1 className="hero__title fade-in-up">
              Desarrollamos
              <span className="hero__title--highlight">
                {" "}
                Soluciones Digitales
              </span>
             
            </h1>

            <p className="hero__description fade-in-up">
              Creamos aplicaciones web, móviles y software personalizado que
              impulsan tu negocio. Desde sitios web modernos hasta apps
              innovadoras que conectan con tus usuarios de manera excepcional.
            </p>

            <div className="hero__stats fade-in-up">
              <div className="stat">
                <div className="stat__number">5+</div>
                <div className="stat__label">Años de Experiencia</div>
              </div>
            </div>

            <div className="hero__actions fade-in-up">
              <button
                onClick={() => scrollToSection("servicios")}
                className="btn btn-primary hero__btn"
              >
                Ver Servicios
              </button>
              <button
                onClick={() => scrollToSection("proyectos")}
                className="btn btn-secondary hero__btn"
              >
                Ver Portfolio
              </button>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__image-container fade-in-right">
              <div className="coffee-cup">
                <div className="cup">
                  <div className="cup__handle"></div>
                  <div className="cup__body"></div>
                  <div className="steam">
                    <div className="steam__line steam__line--1"></div>
                    <div className="steam__line steam__line--2"></div>
                    <div className="steam__line steam__line--3"></div>
                  </div>
                </div>
                <div className="coffee-beans">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className={`bean bean--${i + 1}`}></div>
                  ))}
                </div>
              </div>

              <div className="floating-elements">
                <div className="floating-element floating-element--1">
                  <span className="element-text">Desarrollo Ágil</span>
                </div>
                <div className="floating-element floating-element--2">
                  <span className="element-text">Tecnología Moderna</span>
                </div>
                <div className="floating-element floating-element--3">
                  <span className="element-text">Soporte 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <div className="scroll-arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
