import React from "react";
import { useNavigate } from "react-router-dom";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import "./Services.css";

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

interface ServiceCardProps {
  service: Service;
  index: number;
  onMoreInfo: (serviceTitle: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  onMoreInfo,
}) => {
  const { ref, hasBeenVisible } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`service-card ${hasBeenVisible ? "visible" : ""}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="service-card__icon">
        <span className="icon">{service.icon}</span>
        <div className="icon-bg"></div>
      </div>

      <div className="service-card__content">
        <h3 className="service-card__title">{service.title}</h3>
        <p className="service-card__description">{service.description}</p>

        <ul className="service-card__features">
          {service.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="feature-item">
              <span className="feature-check">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="service-card__action">
        <button
          className="btn btn-secondary service-btn"
          onClick={() => onMoreInfo(service.title)}
        >
          Más Información
        </button>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const navigate = useNavigate();

  // Navega a la página de contacto prellenando el servicio de interés
  // mediante un query param que ContactPage lee al montar.
  const handleMoreInfo = (serviceTitle: string) => {
    navigate(`/contacto?servicio=${encodeURIComponent(serviceTitle)}`);
  };

  const { ref: headerRef, hasBeenVisible: headerVisible } =
    useIntersectionObserver({
      threshold: 0.3,
      triggerOnce: true,
    });
  const services: Service[] = [
    {
      icon: "💻",
      title: "Desarrollo Web",
      description:
        "Sitios web modernos y responsivos con las últimas tecnologías y mejores prácticas.",
      features: [
        "React & Next.js",
        "Diseño Responsivo",
        "Optimización SEO",
        "Performance Premium",
      ],
    },
    {
      icon: "📱",
      title: "Apps Móviles",
      description:
        "Aplicaciones nativas e híbridas para iOS y Android con experiencia excepcional.",
      features: ["React Native", "Flutter", "Diseño Nativo", "Integración API"],
    },
    {
      icon: "⚙️",
      title: "Software Personalizado",
      description:
        "Soluciones de software a medida que se adaptan perfectamente a tu negocio.",
      features: [
        "Análisis de Requerimientos",
        "Arquitectura Escalable",
        "Testing Automatizado",
        "Documentación Completa",
      ],
    },
    {
      icon: "🔌",
      title: "Plugins de WordPress",
      description:
        "Desarrollamos plugins de WordPress a medida para ampliar y personalizar las funcionalidades de tu sitio.",
      features: [
        "Desarrollo a Medida",
        "Integración con APIs",
        "Compatibilidad y Actualizaciones",
        "Optimización y Seguridad",
      ],
    },
    {
      icon: "🤖",
      title: "Agentes de IA & Automatizaciones",
      description:
        "Creamos agentes inteligentes y automatizaciones para optimizar procesos y escalar operaciones.",
      features: [
        "Agentes Conversacionales",
        "Automatización de Flujos",
        "Integración con APIs",
        "Monitoreo y Optimización",
      ],
    },
  ];

  return (
    <section id="servicios" className="services section">
      <div className="container">
        <div
          ref={headerRef}
          className={`services__header text-center ${
            headerVisible ? "visible" : ""
          }`}
        >
          <h2 className="services__title">
            Nuestros <span className="text-orange">Servicios</span>
          </h2>
          <p className="services__subtitle">
            Ofrecemos soluciones tecnológicas completas desde desarrollo web y
            móvil hasta software personalizado que impulsa el crecimiento de tu
            negocio.
          </p>
        </div>

        <div className="services__grid">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              onMoreInfo={handleMoreInfo}
            />
          ))}
        </div>

        <div className="services__cta text-center">
          <h3 className="cta__title">¿Necesitas una solución a medida?</h3>
          <p className="cta__text">
            Contáctanos para crear una solución tecnológica personalizada que se
            adapte perfectamente a las necesidades de tu empresa.
          </p>
          <button
            className="btn btn-primary cta-btn"
            onClick={() => navigate("/contacto")}
          >
            Solicitar Cotización
          </button>
        </div>
      </div>

      {/* Background Elements */}
      <div className="services__bg">
        <div className="bg-element bg-element--1"></div>
        <div className="bg-element bg-element--2"></div>
        <div className="bg-element bg-element--3"></div>
      </div>
    </section>
  );
};

export default Services;
