import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { teamMembers } from "../data/teamData";
import type { TeamMember } from "../data/teamData";
import "./AboutPage.css";

const AboutPage: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const handleSelectMember = (member: TeamMember) => {
    setSelectedMember(member);
    // Scroll suave hacia la sección del CV
    setTimeout(() => {
      const cvSection = document.getElementById("cv-detail");
      if (cvSection) {
        cvSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleBackToTeam = () => {
    setSelectedMember(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="about-page">
      <Header />

      <main className="about-main">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="container">
            <h1 className="about-hero__title">Conoce a Nuestro Equipo</h1>
            <p className="about-hero__subtitle">
              Somos un equipo de desarrolladores apasionados por crear
              soluciones tecnológicas innovadoras que impulsan el éxito de
              nuestros clientes.
            </p>
          </div>
        </section>

        {/* Team Overview - Mostrar cuando no hay selección */}
        {!selectedMember && (
          <section className="team-overview">
            <div className="container">
              <div className="team-grid">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="team-card"
                    onClick={() => handleSelectMember(member)}
                  >
                    <div className="team-card__image-wrapper">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="team-card__image"
                      />
                      <div className="team-card__overlay">
                        <span className="team-card__cta">Ver CV Completo</span>
                      </div>
                    </div>
                    <div className="team-card__content">
                      <h2 className="team-card__name">{member.name}</h2>
                      <p className="team-card__role">{member.role}</p>
                      <p className="team-card__bio">{member.bio}</p>
                      <div className="team-card__skills">
                        {member.skills.slice(0, 4).map((skill, idx) => (
                          <span key={idx} className="skill-preview">
                            {skill}
                          </span>
                        ))}
                        {member.skills.length > 4 && (
                          <span className="skill-preview skill-more">
                            +{member.skills.length - 4} más
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CV Detail - Mostrar cuando hay selección */}
        {selectedMember && (
          <section className="cv-detail" id="cv-detail">
            <div className="container">
              {/* Back Button */}
              <button className="back-button" onClick={handleBackToTeam}>
                ← Volver al equipo
              </button>

              <div className="cv-layout">
                {/* Profile Sidebar */}
                <div className="cv-sidebar">
                  <div className="profile-card">
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="profile-card__image"
                    />
                    <h2 className="profile-card__name">
                      {selectedMember.name}
                    </h2>
                    <p className="profile-card__role">{selectedMember.role}</p>
                    <p className="profile-card__bio">{selectedMember.bio}</p>

                    {/* Contact */}
                    <div className="profile-card__contact">
                      <a
                        href={`mailto:${selectedMember.contact.email}`}
                        className="contact-link"
                      >
                        📧 Email
                      </a>
                      {selectedMember.contact.linkedin && (
                        <a
                          href={selectedMember.contact.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="contact-link"
                        >
                          💼 LinkedIn
                        </a>
                      )}
                      {selectedMember.contact.github && (
                        <a
                          href={selectedMember.contact.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="contact-link"
                        >
                          💻 GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* CV Content */}
                <div className="cv-content">
                  {/* Skills */}
                  <div className="cv-section">
                    <h3 className="cv-section__title">Habilidades Técnicas</h3>
                    <div className="skills-grid">
                      {selectedMember.skills.map((skill, idx) => (
                        <span key={idx} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="cv-section">
                    <h3 className="cv-section__title">
                      Experiencia Profesional
                    </h3>
                    <div className="experience-list">
                      {selectedMember.experience.map((exp, idx) => (
                        <div key={idx} className="experience-item">
                          <div className="experience-item__header">
                            <h4 className="experience-item__position">
                              {exp.position}
                            </h4>
                            <span className="experience-item__period">
                              {exp.period}
                            </span>
                          </div>
                          <p className="experience-item__company">
                            {exp.company}
                          </p>
                          <p className="experience-item__description">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div className="cv-section">
                    <h3 className="cv-section__title">
                      Educación y Certificaciones
                    </h3>
                    <div className="education-list">
                      {selectedMember.education.map((edu, idx) => (
                        <div key={idx} className="education-item">
                          <h4 className="education-item__degree">
                            {edu.degree}
                          </h4>
                          <p className="education-item__institution">
                            {edu.institution}
                          </p>
                          <span className="education-item__year">
                            {edu.year}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="about-cta">
          <div className="container">
            <div className="about-cta__content">
              <h2 className="about-cta__title">
                ¿Listo para trabajar con nosotros?
              </h2>
              <p className="about-cta__text">
                Estamos siempre abiertos a nuevos proyectos y colaboraciones.
                Contáctanos y hablemos sobre cómo podemos ayudarte.
              </p>
              <Link to="/contacto" className="btn btn-primary btn-large">
                Iniciar Conversación
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
