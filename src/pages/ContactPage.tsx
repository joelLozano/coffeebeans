import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "./ContactPage.css";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: "",
};

// Debe mantenerse alineado con los servicios de la sección "Servicios".
const serviceOptions = [
  "Desarrollo Web",
  "Apps Móviles",
  "Software Personalizado",
  "Plugins de WordPress",
  "Agentes de IA & Automatizaciones",
  "Otro",
];

const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [submitted, setSubmitted] = useState(false);

  // Al entrar a la página de contacto, posicionar arriba (sensación de
  // navegar a una nueva pantalla, no heredar el scroll anterior).
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // Prellenar "Servicio de interés" si llega por query param (ej. desde el
  // botón "Más Información" de cada servicio). Si no coincide con una opción
  // conocida, se selecciona "Otro".
  useEffect(() => {
    const servicio = searchParams.get("servicio");
    if (servicio) {
      const match = serviceOptions.includes(servicio) ? servicio : "Otro";
      setFormData((prev) => ({ ...prev, service: match }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Por favor ingresa tu nombre.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Por favor ingresa tu correo electrónico.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Por favor cuéntanos sobre tu proyecto.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    // Aquí se integraría el envío a un backend o servicio de email.
    setSubmitted(true);
    setFormData(initialFormData);
  };

  return (
    <div className="contact-page">
      <Header />

      <main className="contact-main">
        <section className="contact-hero">
          <div className="container">
            <h1 className="contact-hero__title">
              Hablemos de tu <span className="text-orange">proyecto</span>
            </h1>
            <p className="contact-hero__subtitle">
              Cuéntanos qué tienes en mente y te enviaremos una cotización
              personalizada. Completa el formulario y nos pondremos en contacto
              contigo lo antes posible.
            </p>
          </div>
        </section>

        <section className="contact-content section">
          <div className="container">
            <div className="contact-layout">
              {/* Info lateral */}
              <aside className="contact-info">
                <h2 className="contact-info__title">Información de contacto</h2>
                <p className="contact-info__text">
                  Estamos listos para ayudarte a llevar tu idea al siguiente
                  nivel.
                </p>

                <ul className="contact-info__list">
                  <li className="contact-info__item">
                    <span className="contact-info__icon">📧</span>
                    <div>
                      <span className="contact-info__label">Email</span>
                      <a
                        href="mailto:hola@coffeebeans.dev"
                        className="contact-info__value"
                      >
                        hola@coffeebeans.dev
                      </a>
                    </div>
                  </li>
                  <li className="contact-info__item">
                    <span className="contact-info__icon">📱</span>
                    <div>
                      <span className="contact-info__label">Teléfono</span>
                      <a
                        href="tel:+525512345678"
                        className="contact-info__value"
                      >
                        +52 55 1234 5678
                      </a>
                    </div>
                  </li>
                  <li className="contact-info__item">
                    <span className="contact-info__icon">⏱️</span>
                    <div>
                      <span className="contact-info__label">Respuesta</span>
                      <span className="contact-info__value">
                        En menos de 24 horas
                      </span>
                    </div>
                  </li>
                </ul>
              </aside>

              {/* Formulario */}
              <div className="contact-form-wrapper">
                {submitted ? (
                  <div className="contact-success" role="status">
                    <span className="contact-success__icon">✓</span>
                    <h2 className="contact-success__title">
                      ¡Mensaje enviado!
                    </h2>
                    <p className="contact-success__text">
                      Gracias por contactarnos. Hemos recibido tu solicitud y te
                      responderemos muy pronto.
                    </p>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setSubmitted(false)}
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                ) : (
                  <form
                    className="contact-form"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">
                          Nombre <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Tu nombre completo"
                          aria-invalid={!!errors.name}
                        />
                        {errors.name && (
                          <span className="form-error">{errors.name}</span>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">
                          Email <span className="required">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="tu@email.com"
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                          <span className="form-error">{errors.email}</span>
                        )}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="phone">Teléfono</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Opcional"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="company">Empresa</label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Opcional"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="service">Servicio de interés</label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                      >
                        <option value="">Selecciona una opción</option>
                        {serviceOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">
                        Mensaje <span className="required">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Cuéntanos sobre tu proyecto y qué necesitas..."
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && (
                        <span className="form-error">{errors.message}</span>
                      )}
                    </div>

                    <button type="submit" className="btn btn-primary submit-btn">
                      Enviar solicitud
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
