import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Reviews.css";

interface Review {
  id: string;
  name: string;
  position: string;
  company: string;
  rating: number;
  text: string;
  image: string;
  date: string;
  verified: boolean;
}

const Reviews: React.FC = () => {
  const navigate = useNavigate();
  const [currentReview, setCurrentReview] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const reviews: Review[] = [
    {
      id: "1",
      name: "María González",
      position: "CEO",
      company: "E-commerce Moda Plus",
      rating: 5,
      text: "La transformación digital de nuestra tienda fue increíble. No solo desarrollaron una plataforma robusta, sino que implementaron funcionalidades que aumentaron significativamente nuestras ventas online. El ROI se vio reflejado en solo 3 meses.",
      image: "👩‍💼",
      date: "2024-03-15",
      verified: true,
    },
    {
      id: "2",
      name: "Carlos Mendoza",
      position: "Director de Tecnología",
      company: "FinTech Solutions",
      rating: 5,
      text: "El desarrollo de nuestra app móvil bancaria fue excepcional. Implementaron medidas de seguridad de última generación y una UX intuitiva. Los usuarios adoptaron la app rápidamente y tenemos una calificación de 4.8 estrellas en las tiendas.",
      image: "👨‍💻",
      date: "2024-02-28",
      verified: true,
    },
    {
      id: "3",
      name: "Ana Ruiz",
      position: "Gerente de Operaciones",
      company: "Logística Integral SA",
      rating: 5,
      text: "Como empresa familiar de tercera generación, teníamos procesos muy tradicionales. El sistema ERP que desarrollaron digitó nuestras operaciones manteniendo la esencia humana del negocio. La eficiencia aumentó un 200%.",
      image: "👩‍🍳",
      date: "2024-01-20",
      verified: true,
    },
    {
      id: "4",
      name: "Roberto Silva",
      position: "Director de Marketing",
      company: "Hotel Premium Chain",
      rating: 5,
      text: "La plataforma de reservas y gestión hotelera que desarrollaron ha elevado significativamente la experiencia de nuestros huéspedes. El sistema integrado de CRM y booking ha mejorado nuestras conversiones en un 180%.",
      image: "👨‍💼",
      date: "2023-12-10",
      verified: true,
    },
    {
      id: "5",
      name: "Laura Jiménez",
      position: "Coordinadora de Eventos",
      company: "Expo Digital 2024",
      rating: 5,
      text: "La plataforma de eventos virtuales que desarrollaron fue espectacular. No solo tuvo una de las mayores participaciones, sino que integró funcionalidades innovadoras como networking AI y analytics en tiempo real. Definitivamente los queremos para futuros eventos.",
      image: "👩‍🎨",
      date: "2023-11-05",
      verified: true,
    },
    {
      id: "6",
      name: "Diego Herrera",
      position: "CEO",
      company: "Marketplace Digital",
      rating: 5,
      text: "La plataforma de marketplace B2B que crearon se ha convertido en una de las más exitosas del sector. Los vendedores aprecian la facilidad de uso y las herramientas analíticas. Las transacciones superaron nuestras expectativas en un 300%.",
      image: "👨‍🏭",
      date: "2023-10-18",
      verified: true,
    },
  ];

  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isAutoPlay, reviews.length]);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`star ${index < rating ? "star--filled" : ""}`}
      >
        ★
      </span>
    ));
  };

  const goToReview = (index: number) => {
    setCurrentReview(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000); // Resume autoplay after 10 seconds
  };

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="resenas" className="reviews section section-dark">
      <div className="container">
        <div className="reviews__header text-center">
          <h2 className="reviews__title fade-in-up">
            Lo que dicen nuestros <span className="text-orange">Clientes</span>
          </h2>
          <p className="reviews__subtitle fade-in-up">
            La satisfacción de nuestros clientes es nuestro mayor logro. Estas
            son algunas de las experiencias que hemos transformado mediante
            soluciones digitales innovadoras.
          </p>
        </div>

        <div className="reviews__container">
          {/* Main Review Display */}
          <div className="review-showcase">
            <button
              className="review-nav review-nav--prev"
              onClick={prevReview}
              aria-label="Reseña anterior"
            >
              ‹
            </button>

            <div className="review-main">
              <div className="review-card review-card--main">
                <div className="review-header">
                  <div className="review-avatar">
                    <span className="avatar-icon">
                      {reviews[currentReview].image}
                    </span>
                    {reviews[currentReview].verified && (
                      <div
                        className="verified-badge"
                        title="Cliente verificado"
                      >
                        ✓
                      </div>
                    )}
                  </div>

                  <div className="review-author">
                    <h4 className="author-name">
                      {reviews[currentReview].name}
                    </h4>
                    <p className="author-position">
                      {reviews[currentReview].position}
                    </p>
                    <p className="author-company">
                      {reviews[currentReview].company}
                    </p>
                  </div>
                </div>

                <div className="review-rating">
                  {renderStars(reviews[currentReview].rating)}
                  <span className="rating-text">Excelente</span>
                </div>

                <blockquote className="review-text">
                  "{reviews[currentReview].text}"
                </blockquote>

                <div className="review-date">
                  {new Date(reviews[currentReview].date).toLocaleDateString(
                    "es-ES",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </div>
              </div>
            </div>

            <button
              className="review-nav review-nav--next"
              onClick={nextReview}
              aria-label="Siguiente reseña"
            >
              ›
            </button>
          </div>

          {/* Review Indicators */}
          <div className="review-indicators">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`indicator ${
                  index === currentReview ? "indicator--active" : ""
                }`}
                onClick={() => goToReview(index)}
                aria-label={`Ver reseña ${index + 1}`}
              />
            ))}
          </div>

          {/* Review Thumbnails */}
          <div className="review-thumbnails">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className={`thumbnail ${
                  index === currentReview ? "thumbnail--active" : ""
                }`}
                onClick={() => goToReview(index)}
              >
                <div className="thumbnail-avatar">
                  <span className="thumbnail-icon">{review.image}</span>
                </div>
                <div className="thumbnail-info">
                  <div className="thumbnail-name">{review.name}</div>
                  <div className="thumbnail-company">{review.company}</div>
                  <div className="thumbnail-rating">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="reviews__stats">
          <div className="stat-item">
            <div className="stat-number">4.9</div>
            <div className="stat-label">Calificación Promedio</div>
            <div className="stat-stars">{renderStars(5)}</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Clientes Satisfechos</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Recomendarían</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">150+</div>
            <div className="stat-label">Proyectos Exitosos</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="reviews__cta text-center">
          <h3 className="cta__title">
            ¿Quieres ser nuestro próximo caso de éxito?
          </h3>
          <p className="cta__text">
            Únete a cientos de empresas que han transformado digitalmente sus
            negocios con nuestras soluciones de software.
          </p>
          <button
            className="btn btn-primary cta-btn"
            onClick={() => navigate("/contacto")}
          >
            Comenzar Mi Proyecto
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
