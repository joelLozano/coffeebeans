import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { blogPosts, categories } from "../../data/blogData";
import "./Blog.css";

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  const filteredPosts =
    selectedCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    <section id="blog" className="blog section">
      <div className="container">
        <div className="blog__header text-center">
          <h2 className="blog__title fade-in-up">
            Blog de <span className="text-orange">Desarrollo</span>
          </h2>
          <p className="blog__subtitle fade-in-up">
            Descubre las últimas tendencias y mejores prácticas en desarrollo de
            software a través de nuestros artículos y guías especializadas.
          </p>
        </div>

        {/* Featured Posts */}
        <div className="blog__featured">
          <h3 className="featured__title">Artículos Destacados</h3>
          <div className="featured__grid">
            {featuredPosts.slice(0, 3).map((post, index) => (
              <article
                key={post.id}
                className="featured-post fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => {
                  navigate(`/blog/${post.id}`);
                }}
              >
                <div className="featured-post__image">
                  <div className="post-icon">{post.image}</div>
                  <div className="post-category">
                    {categories.find((cat) => cat.id === post.category)?.label}
                  </div>
                </div>

                <div className="featured-post__content">
                  <h4 className="post-title">{post.title}</h4>
                  <p className="post-excerpt">{post.excerpt}</p>

                  <div className="post-meta">
                    <div className="meta-item">
                      <span className="meta-icon">👤</span>
                      <span className="meta-text">{post.author}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">📅</span>
                      <span className="meta-text">
                        {new Date(post.date).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">⏱️</span>
                      <span className="meta-text">{post.readTime} min</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="blog__filters">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`filter-btn ${
                selectedCategory === category.id ? "filter-btn--active" : ""
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* All Posts */}
        <div className="blog__grid">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className="blog-post fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => {
                navigate(`/blog/${post.id}`);
              }}
            >
              <div className="blog-post__image">
                <div className="post-icon">{post.image}</div>
                {post.featured && (
                  <div className="featured-badge">Destacado</div>
                )}
              </div>

              <div className="blog-post__content">
                <div className="post-category">
                  {categories.find((cat) => cat.id === post.category)?.label}
                </div>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-excerpt">{post.excerpt}</p>

                <div className="post-tags">
                  {post.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="post-meta">
                  <div className="meta-author">
                    <span className="author-name">{post.author}</span>
                  </div>
                  <div className="meta-info">
                    <span className="read-time">
                      {post.readTime} min lectura
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
