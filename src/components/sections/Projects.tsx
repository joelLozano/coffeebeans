import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import "./Projects.css";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  details: string;
  tech: string[];
  client: string;
  year: string;
}

interface ProjectCardProps {
  project: Project;
  categories: { id: string; label: string }[];
  onSelectProject: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  categories,
  onSelectProject,
}) => {
  const { ref, hasBeenVisible } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
  });

  const categoryLabel = categories.find(
    (cat) => cat.id === project.category
  )?.label;

  return (
    <article
      ref={ref}
      className={`project-card ${hasBeenVisible ? "visible" : ""}`}
      onClick={() => onSelectProject(project)}
    >
      <div className="project-card__image">
        <div className="project-meta">
          <span className="project-category">{categoryLabel}</span>
          <span className="project-year">{project.year}</span>
        </div>
        <div className="project-icon" aria-hidden="true">
          {project.image}
        </div>
      </div>

      <div className="project-card__content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        <div className="project-tech">
          {project.tech.slice(0, 3).map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="tech-more">+{project.tech.length - 3}</span>
          )}
        </div>

        <div className="project-card__footer">
          <button
            type="button"
            className="project-card__link"
            aria-label={`Ver detalles del proyecto ${project.title}`}
          >
            Ver proyecto
            <span className="project-card__arrow" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      </div>
    </article>
  );
};

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { ref: headerRef, hasBeenVisible: headerVisible } =
    useIntersectionObserver({
      threshold: 0.3,
      triggerOnce: true,
    });

  const { ref: filtersRef, hasBeenVisible: filtersVisible } =
    useIntersectionObserver({
      threshold: 0.3,
      triggerOnce: true,
    });

  const categories = [
    { id: "all", label: "Todos" },
    { id: "web", label: "Desarrollo Web" },
    { id: "mobile", label: "Apps Móviles" },
    { id: "ecommerce", label: "E-commerce" },
    { id: "software", label: "Software" },
  ];

  const projects: Project[] = [
    {
      id: "1",
      title: "E-commerce TechStore",
      category: "ecommerce",
      description:
        "Plataforma de comercio electrónico completa con sistema de pagos integrado",
      image: "🛍️",
      details:
        "Desarrollo completo de tienda online con carrito de compras, sistema de pagos, gestión de inventario y panel administrativo. Incluye integración con pasarelas de pago y sistema de envíos. Resultado: incremento del 300% en ventas online.",
      tech: ["React & Next.js", "Node.js API", "MongoDB", "Stripe Payments"],
      client: "TechStore",
      year: "2024",
    },
    {
      id: "2",
      title: "App Móvil HealthTracker",
      category: "mobile",
      description:
        "Aplicación de seguimiento de salud y fitness con inteligencia artificial",
      image: "📱",
      details:
        "Aplicación nativa para iOS y Android con seguimiento de actividad física, nutrición y salud. Incluye IA para recomendaciones personalizadas, integración con wearables y gamificación.",
      tech: [
        "React Native",
        "Firebase",
        "Machine Learning",
        "HealthKit/Google Fit",
      ],
      client: "HealthCorp",
      year: "2024",
    },
    {
      id: "3",
      title: "Portal Corporativo InnovateTech",
      category: "web",
      description:
        "Portal empresarial con sistema de gestión de empleados y comunicación interna",
      image: "🏢",
      details:
        "Desarrollo de portal corporativo completo con sistema de gestión de recursos humanos, comunicación interna, calendario de eventos y centro de documentos. Incluye dashboard analítico y módulo de reportes.",
      tech: ["Vue.js Frontend", "Laravel API", "MySQL Database", "AWS Hosting"],
      client: "InnovateTech Solutions",
      year: "2023",
    },
    {
      id: "4",
      title: "ERP InventoryPro",
      category: "software",
      description:
        "Sistema ERP completo para gestión empresarial e inventarios",
      image: "📈",
      details:
        "Desarrollo de sistema ERP personalizado para gestión integral de empresa, incluyendo inventarios, facturación, CRM, contabilidad y reportes. Dashboard ejecutivo con analíticas en tiempo real.",
      tech: [
        "Angular Frontend",
        "Python Django",
        "PostgreSQL",
        "Docker & Redis",
      ],
      client: "ManufacturingCorp",
      year: "2023",
    },
    {
      id: "5",
      title: "Plataforma EducaOnline",
      category: "web",
      description:
        "Plataforma educativa online con streaming de video y evaluaciones",
      image: "🎓",
      details:
        "Plataforma completa de e-learning con streaming de video, sistema de evaluaciones, seguimiento de progreso, certificaciones y comunidad estudiantil. Incluye app móvil companion.",
      tech: [
        "React & TypeScript",
        "Video Streaming",
        "WebRTC",
        "Certificaciones SSL",
      ],
      client: "EduTech Institute",
      year: "2024",
    },
    {
      id: "6",
      title: "App de Delivery FoodExpress",
      category: "mobile",
      description:
        "Aplicación de delivery con tracking en tiempo real y pagos integrados",
      image: "🚚",
      details:
        "App completa de delivery con geolocalización, tracking en tiempo real, sistema de calificaciones, chat en vivo, múltiples métodos de pago y panel administrativo para restaurantes.",
      tech: [
        "Flutter Cross-platform",
        "Google Maps API",
        "Real-time Updates",
        "Payment Gateway",
      ],
      client: "FoodExpress",
      year: "2023",
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="proyectos" className="projects section section-gray">
      <div className="container">
        <div
          ref={headerRef}
          className={`projects__header text-center ${
            headerVisible ? "visible" : ""
          }`}
        >
          <h2 className="projects__title">
            Nuestros <span className="text-orange">Proyectos</span>
          </h2>
          <p className="projects__subtitle">
            Casos de éxito que demuestran nuestro compromiso con la excelencia
            en desarrollo de software y la innovación tecnológica.
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          ref={filtersRef}
          className={`projects__filters ${filtersVisible ? "visible" : ""}`}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`filter-btn ${
                activeFilter === category.id ? "filter-btn--active" : ""
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects__grid">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              categories={categories}
              onSelectProject={setSelectedProject}
            />
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div
            className="project-modal"
            onClick={() => setSelectedProject(null)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                onClick={() => setSelectedProject(null)}
              >
                ×
              </button>

              <div className="modal-header">
                <div className="modal-icon">{selectedProject.image}</div>
                <div className="modal-info">
                  <h3 className="modal-title">{selectedProject.title}</h3>
                  <div className="modal-meta">
                    <span className="modal-client">
                      Cliente: {selectedProject.client}
                    </span>
                    <span className="modal-year">
                      Año: {selectedProject.year}
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-body">
                <p className="modal-description">{selectedProject.details}</p>

                <div className="modal-tech">
                  <h4>Tecnología y Servicios:</h4>
                  <div className="tech-list">
                    {selectedProject.tech.map((tech, index) => (
                      <span key={index} className="tech-item">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/contacto")}
                >
                  Solicitar Cotización Similar
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedProject(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="projects__cta text-center">
          <h3 className="cta__title">¿Tienes un proyecto en mente?</h3>
          <p className="cta__text">
            Cuéntanos tu visión y trabajemos juntos para crear algo
            extraordinario.
          </p>
          <button
            className="btn btn-primary cta-btn"
            onClick={() => navigate("/contacto")}
          >
            Iniciar Proyecto
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
