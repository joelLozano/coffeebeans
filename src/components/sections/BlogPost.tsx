import React, { useState, useEffect } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import "./BlogPost.css";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  fullContent?: string;
  tableOfContents?: Array<{ id: string; title: string; level: number }>;
  category: string;
  author: string;
  authorRole?: string;
  authorBio?: string;
  authorAvatar?: string;
  authorSocial?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  date: string;
  readTime: number;
  image: string;
  featured: boolean;
  tags: string[];
  likes?: number;
  views?: number;
  relatedPosts?: string[];
}

interface Category {
  id: string;
  label: string;
}

interface BlogPostPageProps {
  post: BlogPost;
  allPosts: BlogPost[];
  onClose: () => void;
  categories: Category[];
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({
  post,
  allPosts,
  onClose,
  categories,
}) => {
  const [currentSection, setCurrentSection] = useState("");
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  // Generate consistent numbers based on post ID
  const generateConsistentNumber = (id: string, range: number, min: number) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      const char = id.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash % range) + min;
  };

  const initialLikes = post.likes || generateConsistentNumber(post.id, 200, 50);
  const initialViews =
    post.views || generateConsistentNumber(post.id, 5000, 1000);
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);

  // Generate related posts
  const relatedPosts = post.relatedPosts
    ? allPosts.filter((p) => post.relatedPosts?.includes(p.id))
    : allPosts
        .filter(
          (p) =>
            p.id !== post.id &&
            (p.category === post.category ||
              p.tags.some((tag) => post.tags.includes(tag)))
        )
        .slice(0, 3);

  // Generate table of contents if not provided
  const tableOfContents = post.tableOfContents || [
    { id: "introduccion", title: "Introducción", level: 1 },
    { id: "contenido-principal", title: "Contenido Principal", level: 1 },
    { id: "ejemplos", title: "Ejemplos Prácticos", level: 2 },
    { id: "mejores-practicas", title: "Mejores Prácticas", level: 2 },
    { id: "conclusion", title: "Conclusión", level: 1 },
  ];

  const fullContent = post.fullContent || post.content;

  const { ref: headerRef, hasBeenVisible: headerVisible } =
    useIntersectionObserver({
      threshold: 0.3,
      triggerOnce: true,
    });

  const { ref: contentRef, hasBeenVisible: contentVisible } =
    useIntersectionObserver({
      threshold: 0.2,
      triggerOnce: true,
    });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Update current section on scroll
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]");
      let current = "";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          current = section.getAttribute("data-section") || "";
        }
      });

      setCurrentSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `${post.title} - ${post.excerpt}`;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
          )}&url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        alert("Enlace copiado al portapapeles");
        break;
    }
    setShowShareMenu(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      desarrollo: "#3b82f6",
      frontend: "#10b981",
      backend: "#8b5cf6",
      mobile: "#f59e0b",
      tendencias: "#ef4444",
      default: "#6b7280",
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  return (
    <div className="blog-post-page">
      {/* Navigation Bar */}
      <div className="blog-post-nav">
        <div className="container">
          <div className="nav-content">
            <button className="back-btn" onClick={onClose}>
              <span className="back-icon">←</span>
              <span className="back-text">Volver al Blog</span>
            </button>

            <div className="nav-actions">
              <button
                className={`bookmark-btn ${isBookmarked ? "bookmarked" : ""}`}
                onClick={() => setIsBookmarked(!isBookmarked)}
                title="Guardar artículo"
              >
                🔖
              </button>

              <div className="share-dropdown">
                <button
                  className="share-btn"
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  title="Compartir artículo"
                >
                  📤
                </button>

                {showShareMenu && (
                  <div className="share-menu">
                    <button onClick={() => handleShare("twitter")}>
                      🐦 Twitter
                    </button>
                    <button onClick={() => handleShare("linkedin")}>
                      💼 LinkedIn
                    </button>
                    <button onClick={() => handleShare("facebook")}>
                      📘 Facebook
                    </button>
                    <button onClick={() => handleShare("copy")}>
                      📋 Copiar enlace
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <header
        ref={headerRef}
        className={`article-header ${headerVisible ? "visible" : ""}`}
      >
        <div className="container">
          <div className="header-content">
            <div className="article-meta">
              <span
                className="category-badge"
                style={{ backgroundColor: getCategoryColor(post.category) }}
              >
                {post.category}
              </span>
              <span className="read-time">
                ⏱️ {post.readTime} min de lectura
              </span>
              {post.featured && (
                <span className="featured-badge">⭐ Destacado</span>
              )}
            </div>

            <h1 className="article-title">{post.title}</h1>

            <p className="article-excerpt">{post.excerpt}</p>

            <div className="article-info">
              <div className="author-info">
                <div className="author-avatar">
                  {post.authorAvatar ||
                    post.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                </div>
                <div className="author-details">
                  <div className="author-name">{post.author}</div>
                  <div className="publish-date">{formatDate(post.date)}</div>
                </div>
              </div>

              <div className="article-stats">
                <button
                  className={`like-btn ${hasLiked ? "liked" : ""}`}
                  onClick={handleLike}
                >
                  <span className="like-icon">{hasLiked ? "❤️" : "🤍"}</span>
                  <span className="like-count">{likes}</span>
                </button>
                <span className="views">👀 {initialViews}</span>
              </div>
            </div>

            <div className="article-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="article-main">
        <div className="container">
          <div className="article-layout">
            {/* Table of Contents - Desktop */}
            <aside className="toc-sidebar">
              <div className="toc-container">
                <h3>Contenido del artículo</h3>
                <nav className="toc-nav">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`toc-link level-${item.level} ${
                        currentSection === item.id ? "active" : ""
                      }`}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <article
              ref={contentRef}
              className={`article-content ${contentVisible ? "visible" : ""}`}
            >
              <div className="content-body">
                {/* Article Image */}
                <div className="article-image-container">
                  <div className="article-image">
                    <span className="article-emoji">{post.image}</span>
                  </div>
                </div>

                {/* Content Sections */}
                <div className="content-section" data-section="introduction">
                  <h2 id="introduction">Introducción</h2>
                  <p className="lead-paragraph">{fullContent}</p>

                  <p>
                    En el mundo del desarrollo moderno, mantenerse actualizado
                    con las últimas tecnologías y mejores prácticas es esencial
                    para crear aplicaciones robustas y escalables. Este artículo
                    profundiza en conceptos clave que todo desarrollador debería
                    conocer.
                  </p>
                </div>

                <div className="content-section" data-section="fundamentos">
                  <h2 id="fundamentos">Fundamentos Clave</h2>

                  <h3>Conceptos Básicos</h3>
                  <p>
                    Los fundamentos del desarrollo de software han evolucionado
                    significativamente en los últimos años. Desde patrones de
                    diseño hasta arquitecturas modernas, entender estos
                    conceptos es crucial para el éxito del proyecto.
                  </p>

                  <div className="code-block">
                    <div className="code-header">
                      <span className="code-language">JavaScript</span>
                      <button className="copy-code-btn" title="Copiar código">
                        📋
                      </button>
                    </div>
                    <pre>
                      <code>{`// Ejemplo de implementación moderna
const useCustomHook = () => {
  const [state, setState] = useState(initialState);
  
  useEffect(() => {
    // Lógica del efecto
    return cleanup;
  }, [dependencies]);
  
  return { state, setState };
};`}</code>
                    </pre>
                  </div>

                  <div className="info-callout">
                    <div className="callout-icon">💡</div>
                    <div className="callout-content">
                      <strong>Consejo Pro:</strong> Siempre considera el
                      rendimiento y la escalabilidad desde el inicio del
                      proyecto. Las optimizaciones tempranas pueden ahorrar
                      mucho tiempo después.
                    </div>
                  </div>
                </div>

                <div className="content-section" data-section="implementacion">
                  <h2 id="implementacion">Implementación Práctica</h2>

                  <p>
                    La implementación práctica requiere un equilibrio entre la
                    teoría y la aplicación real. Veamos algunos ejemplos
                    concretos de cómo aplicar estos conceptos en proyectos
                    reales.
                  </p>

                  <h3>Pasos de Implementación</h3>
                  <ol className="implementation-steps">
                    <li>
                      <strong>Análisis de Requisitos:</strong> Define claramente
                      qué necesitas lograr y qué restricciones tienes.
                    </li>
                    <li>
                      <strong>Diseño de Arquitectura:</strong> Planifica la
                      estructura general de tu aplicación antes de comenzar a
                      codificar.
                    </li>
                    <li>
                      <strong>Desarrollo Iterativo:</strong> Implementa
                      funcionalidades de manera incremental y prueba
                      constantemente.
                    </li>
                    <li>
                      <strong>Optimización:</strong> Identifica y mejora los
                      cuellos de botella de rendimiento.
                    </li>
                  </ol>

                  <div className="warning-callout">
                    <div className="callout-icon">⚠️</div>
                    <div className="callout-content">
                      <strong>Importante:</strong> No optimices prematuramente.
                      Primero haz que funcione, luego haz que sea rápido.
                    </div>
                  </div>
                </div>

                <div
                  className="content-section"
                  data-section="mejores-practicas"
                >
                  <h2 id="mejores-practicas">Mejores Prácticas</h2>

                  <p>
                    Adoptar las mejores prácticas desde el inicio del proyecto
                    puede marcar la diferencia entre un código mantenible y uno
                    que se convierte en una pesadilla técnica.
                  </p>

                  <div className="practices-grid">
                    <div className="practice-card">
                      <h4>🧪 Testing</h4>
                      <p>
                        Implementa pruebas automatizadas desde el inicio. Las
                        pruebas unitarias, de integración y e2e son
                        fundamentales.
                      </p>
                    </div>
                    <div className="practice-card">
                      <h4>📚 Documentación</h4>
                      <p>
                        Documenta tu código y decisiones arquitectónicas. Tu yo
                        futuro (y tu equipo) te lo agradecerá.
                      </p>
                    </div>
                    <div className="practice-card">
                      <h4>🔄 CI/CD</h4>
                      <p>
                        Automatiza el proceso de despliegue. La integración y
                        entrega continua mejoran la calidad y velocidad.
                      </p>
                    </div>
                    <div className="practice-card">
                      <h4>🔒 Seguridad</h4>
                      <p>
                        Considera la seguridad desde el diseño. Valida inputs,
                        usa HTTPS y mantén las dependencias actualizadas.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="content-section" data-section="conclusion">
                  <h2 id="conclusion">Conclusión</h2>

                  <p>
                    El desarrollo de software moderno requiere un enfoque
                    holístico que combine conocimientos técnicos sólidos con
                    mejores prácticas de la industria. Al implementar estos
                    conceptos y técnicas, estarás mejor preparado para crear
                    aplicaciones de alta calidad.
                  </p>

                  <div className="key-takeaways">
                    <h3>Puntos Clave</h3>
                    <ul>
                      <li>
                        ✅ Mantente actualizado con las últimas tecnologías
                      </li>
                      <li>✅ Implementa pruebas desde el inicio</li>
                      <li>
                        ✅ Prioriza la legibilidad y mantenibilidad del código
                      </li>
                      <li>
                        ✅ Considera el rendimiento en el diseño de la
                        arquitectura
                      </li>
                      <li>✅ Documenta decisiones importantes</li>
                    </ul>
                  </div>

                  <div className="next-steps">
                    <h3>Próximos Pasos</h3>
                    <p>
                      ¿Quieres profundizar más en estos temas? Te recomendamos
                      explorar nuestros artículos relacionados y poner en
                      práctica estos conceptos en tus proyectos personales.
                    </p>
                  </div>
                </div>
              </div>

              {/* Article Footer */}
              <footer className="article-footer">
                <div className="article-actions">
                  <button
                    className={`like-btn large ${hasLiked ? "liked" : ""}`}
                    onClick={handleLike}
                  >
                    <span className="like-icon">{hasLiked ? "❤️" : "🤍"}</span>
                    <span className="like-text">
                      {hasLiked ? "Te gusta" : "Me gusta"} ({likes})
                    </span>
                  </button>

                  <button
                    className="share-btn large"
                    onClick={() => setShowShareMenu(!showShareMenu)}
                  >
                    <span className="share-icon">📤</span>
                    <span className="share-text">Compartir</span>
                  </button>
                </div>

                <div className="author-card">
                  <div className="author-avatar large">
                    {post.authorAvatar ||
                      post.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                  </div>
                  <div className="author-info">
                    <h4>{post.authorRole || "Sobre el autor"}</h4>
                    <h3>{post.author}</h3>
                    <p>
                      {post.authorBio ||
                        `${post.author} es un desarrollador especializado en ${
                          categories.find((cat) => cat.id === post.category)
                            ?.label || post.category
                        } con amplia experiencia en proyectos web modernos.`}
                    </p>
                    {post.authorSocial && (
                      <div className="author-social">
                        {post.authorSocial.twitter && (
                          <button className="social-btn">🐦 Twitter</button>
                        )}
                        {post.authorSocial.linkedin && (
                          <button className="social-btn">💼 LinkedIn</button>
                        )}
                        {post.authorSocial.github && (
                          <button className="social-btn">🐙 GitHub</button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </footer>
            </article>
          </div>
        </div>
      </main>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="related-articles">
          <div className="container">
            <h2 className="section-title">Artículos Relacionados</h2>
            <div className="related-grid">
              {relatedPosts.slice(0, 3).map((relatedPost) => (
                <article key={relatedPost.id} className="related-card">
                  <div className="related-image">
                    <span className="related-emoji">{relatedPost.image}</span>
                  </div>
                  <div className="related-content">
                    <div className="related-meta">
                      <span
                        className="related-category"
                        style={{
                          backgroundColor: getCategoryColor(
                            relatedPost.category
                          ),
                        }}
                      >
                        {categories.find(
                          (cat) => cat.id === relatedPost.category
                        )?.label || relatedPost.category}
                      </span>
                      <span className="related-read-time">
                        {relatedPost.readTime} min
                      </span>
                    </div>
                    <h3 className="related-title">{relatedPost.title}</h3>
                    <p className="related-excerpt">{relatedPost.excerpt}</p>
                    <div className="related-footer">
                      <span className="related-author">
                        {relatedPost.author}
                      </span>
                      <span className="related-date">
                        {formatDate(relatedPost.date)}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-card">
            <div className="newsletter-icon">📧</div>
            <h3>¿Te gustó este artículo?</h3>
            <p>
              Suscríbete a nuestro newsletter y recibe contenido exclusivo sobre
              desarrollo directamente en tu bandeja de entrada.
            </p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="tu@email.com"
                className="newsletter-input"
              />
              <button className="newsletter-btn btn btn-primary">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;
