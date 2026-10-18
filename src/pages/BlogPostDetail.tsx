import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogPosts, categories } from "../data/blogData";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
// import BlogPostPage from "../components/sections/BlogPost";

const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header />
        <main
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "#1f2937",
                marginBottom: "1rem",
              }}
            >
              Artículo no encontrado
            </h1>
            <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
              El artículo que buscas no existe o ha sido removido.
            </p>
            <button
              onClick={() => navigate("/")}
              style={{
                backgroundColor: "#ff7f00",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#e56500")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#ff7f00")}
            >
              Volver al inicio
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <main style={{ flex: 1, padding: "2rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              backgroundColor: "#ff7f00",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              marginBottom: "2rem",
            }}
          >
            ← Volver al Blog
          </button>

          <article>
            <header style={{ marginBottom: "2rem" }}>
              <div style={{ marginBottom: "1rem" }}>
                <span
                  style={{
                    backgroundColor: "#ff7f00",
                    color: "white",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "1rem",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                  }}
                >
                  {categories.find((cat) => cat.id === post.category)?.label}
                </span>
              </div>

              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#1f2937",
                  marginBottom: "1rem",
                  lineHeight: "1.2",
                }}
              >
                {post.title}
              </h1>

              <p
                style={{
                  fontSize: "1.25rem",
                  color: "#6b7280",
                  marginBottom: "1.5rem",
                  lineHeight: "1.6",
                }}
              >
                {post.excerpt}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "2rem",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "#ff7f00",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  {post.authorAvatar ||
                    post.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                </div>
                <div>
                  <div style={{ fontWeight: "600", color: "#1f2937" }}>
                    {post.author}
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    {new Date(post.date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    · {post.readTime} min de lectura
                  </div>
                </div>
              </div>
            </header>

            <div
              style={{
                fontSize: "4rem",
                textAlign: "center",
                margin: "2rem 0",
              }}
            >
              {post.image}
            </div>

            <div
              style={{
                fontSize: "1.125rem",
                lineHeight: "1.7",
                color: "#374151",
              }}
            >
              <p style={{ marginBottom: "1.5rem" }}>
                {post.fullContent || post.content}
              </p>

              <p style={{ marginBottom: "1.5rem" }}>
                En el mundo del desarrollo moderno, mantenerse actualizado con
                las últimas tecnologías y mejores prácticas es esencial para
                crear aplicaciones robustas y escalables. Este artículo
                profundiza en conceptos clave que todo desarrollador debería
                conocer.
              </p>

              <p style={{ marginBottom: "1.5rem" }}>
                A lo largo de los próximos minutos, exploraremos las
                implementaciones más efectivas, las herramientas indispensables
                y las estrategias que marcarán la diferencia en tu próximo
                proyecto de desarrollo.
              </p>
            </div>

            <div
              style={{
                marginTop: "3rem",
                padding: "1.5rem",
                backgroundColor: "#f9fafb",
                borderRadius: "0.5rem",
              }}
            >
              <h3 style={{ marginBottom: "1rem", color: "#1f2937" }}>Tags:</h3>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: "#e5e7eb",
                      color: "#374151",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "1rem",
                      fontSize: "0.875rem",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostDetail;
