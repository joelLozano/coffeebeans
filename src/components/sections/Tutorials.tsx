import React, { useState } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import "./Tutorials.css";

interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: number;
  category: string;
  steps: TutorialStep[];
  materials: string[];
  tips: string[];
  image: string;
  videoUrl?: string;
}

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  image: string;
  time: number;
}

interface TutorialCardProps {
  tutorial: Tutorial;
  index: number;
  onSelectTutorial: (tutorial: Tutorial) => void;
  getDifficultyLabel: (difficulty: string) => string;
  getDifficultyColor: (difficulty: string) => string;
}

const TutorialCard: React.FC<TutorialCardProps> = ({
  tutorial,
  index,
  onSelectTutorial,
  getDifficultyLabel,
  getDifficultyColor,
}) => {
  const { ref, hasBeenVisible } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`tutorial-card ${hasBeenVisible ? "visible" : ""}`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => onSelectTutorial(tutorial)}
    >
      <div className="tutorial-card__header">
        <div className="tutorial-icon">{tutorial.image}</div>
        <div
          className="difficulty-badge"
          style={{
            backgroundColor: getDifficultyColor(tutorial.difficulty),
          }}
        >
          {getDifficultyLabel(tutorial.difficulty)}
        </div>
      </div>

      <div className="tutorial-card__content">
        <h3 className="tutorial-title">{tutorial.title}</h3>
        <p className="tutorial-description">{tutorial.description}</p>

        <div className="tutorial-meta">
          <div className="meta-item">
            <span className="meta-icon">⏱️</span>
            <span className="meta-text">{tutorial.duration} min</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">📋</span>
            <span className="meta-text">{tutorial.steps.length} pasos</span>
          </div>
        </div>

        <div className="tutorial-preview">
          <span className="preview-label">Lo que aprenderás:</span>
          <ul className="preview-list">
            {tutorial.steps.slice(0, 3).map((step) => (
              <li key={step.id} className="preview-item">
                {step.title}
              </li>
            ))}
            {tutorial.steps.length > 3 && (
              <li className="preview-more">
                +{tutorial.steps.length - 3} pasos más
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="tutorial-card__footer">
        <button className="btn btn-secondary tutorial-btn">
          Comenzar Tutorial
        </button>
      </div>
    </div>
  );
};

const Tutorials: React.FC = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(
    null
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");

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
    { id: "react", label: "React" },
    { id: "nodejs", label: "Node.js" },
    { id: "mobile", label: "Móvil" },
    { id: "database", label: "Base de Datos" },
    { id: "deployment", label: "Deployment" },
  ];

  const tutorials: Tutorial[] = [
    {
      id: "1",
      title: "React Hooks: useState y useEffect desde Cero",
      description:
        "Aprende a usar los hooks fundamentales de React para manejar estado y efectos secundarios",
      difficulty: "intermediate",
      duration: 15,
      category: "react",
      image: "⚛️",
      materials: [
        "Node.js instalado",
        "Editor de código (VS Code)",
        "React 18+",
        "Extensión de React DevTools",
        "Terminal o línea de comandos",
        "Navegador web",
      ],
      tips: [
        "Siempre usa hooks en el nivel superior del componente",
        "Usa arrays de dependencias correctamente en useEffect",
        "Evita mutaciones directas del estado",
        "Considera usar el React Developer Tools para debugging",
      ],
      steps: [
        {
          id: 1,
          title: "Configuración Inicial del Proyecto",
          description:
            "Crea un nuevo proyecto React y configura el entorno de desarrollo con las herramientas necesarias.",
          image: "⚙️",
          time: 3,
        },
        {
          id: 2,
          title: "Entendiendo useState",
          description:
            "Implementa el hook useState para manejar estado local en tu componente funcional.",
          image: "📦",
          time: 5,
        },
        {
          id: 3,
          title: "Trabajando con useEffect",
          description:
            "Aprende a usar useEffect para manejar efectos secundarios y el ciclo de vida del componente.",
          image: "🔄",
          time: 4,
        },
        {
          id: 4,
          title: "Arrays de Dependencias",
          description:
            "Domina el control de cuándo se ejecutan los efectos usando arrays de dependencias.",
          image: "🎯",
          time: 3,
        },
      ],
    },
    {
      id: "2",
      title: "Node.js API REST con Express",
      description:
        "Construye una API REST completa con autenticación y base de datos",
      difficulty: "advanced",
      duration: 45,
      category: "nodejs",
      image: "🚀",
      materials: [
        "Node.js 18+",
        "MongoDB o PostgreSQL",
        "Postman o Insomnia",
        "Editor de código",
        "Terminal",
      ],
      tips: [
        "Usa middleware para validaciones",
        "Implementa manejo de errores centralizado",
        "Considera usar TypeScript para mayor seguridad",
        "Documenta tu API con Swagger",
      ],
      steps: [
        {
          id: 1,
          title: "Configuración del Proyecto",
          description:
            "Inicializa el proyecto Node.js e instala las dependencias necesarias como Express y mongoose.",
          image: "📋",
          time: 5,
        },
        {
          id: 2,
          title: "Estructura de Carpetas",
          description:
            "Organiza tu proyecto con una estructura escalable usando controladores, rutas y modelos.",
          image: "📁",
          time: 8,
        },
        {
          id: 3,
          title: "Conexión a Base de Datos",
          description:
            "Establece la conexión con MongoDB y configura los esquemas de datos.",
          image: "🗄️",
          time: 10,
        },
        {
          id: 4,
          title: "Rutas y Controladores",
          description:
            "Crea las rutas CRUD y sus controladores para manejar las operaciones de la API.",
          image: "🛤️",
          time: 15,
        },
        {
          id: 5,
          title: "Autenticación JWT",
          description:
            "Implementa autenticación segura usando JSON Web Tokens para proteger tu API.",
          image: "🔐",
          time: 7,
        },
      ],
    },
    {
      id: "3",
      title: "React Native: Tu Primera App Móvil",
      description:
        "Desarrolla una aplicación móvil completa desde cero con React Native",
      difficulty: "beginner",
      duration: 30,
      category: "mobile",
      image: "📱",
      materials: [
        "React Native CLI",
        "Android Studio / Xcode",
        "Dispositivo físico o emulador",
        "Editor de código",
        "Node.js",
      ],
      tips: [
        "Usa Expo para un desarrollo más rápido al inicio",
        "Prueba en dispositivos reales siempre que sea posible",
        "Aprovecha las librerías de la comunidad",
        "Considera la navegación desde el inicio",
      ],
      steps: [
        {
          id: 1,
          title: "Instalación y Setup",
          description:
            "Instala React Native CLI y configura el entorno de desarrollo para Android e iOS.",
          image: "⚙️",
          time: 10,
        },
        {
          id: 2,
          title: "Primer Componente",
          description:
            "Crea tu primer componente React Native y entiende las diferencias con React web.",
          image: "🧱",
          time: 8,
        },
        {
          id: 3,
          title: "Navegación entre Pantallas",
          description:
            "Implementa navegación usando React Navigation para crear un flujo de pantallas.",
          image: "🧭",
          time: 7,
        },
        {
          id: 4,
          title: "Estilos y Layout",
          description:
            "Aprende a usar Flexbox y StyleSheet para crear interfaces atractivas y responsivas.",
          image: "🎨",
          time: 5,
        },
      ],
    },
  ];

  const filteredTutorials =
    selectedCategory === "all"
      ? tutorials
      : tutorials.filter((tutorial) => tutorial.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "#22c55e";
      case "intermediate":
        return "#f59e0b";
      case "advanced":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "Principiante";
      case "intermediate":
        return "Intermedio";
      case "advanced":
        return "Avanzado";
      default:
        return "Desconocido";
    }
  };

  const nextStep = () => {
    if (selectedTutorial && currentStep < selectedTutorial.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const closeModal = () => {
    setSelectedTutorial(null);
    setCurrentStep(0);
  };

  return (
    <section id="tutoriales" className="tutorials section section-gray">
      <div className="container">
        <div
          ref={headerRef}
          className={`tutorials__header text-center ${
            headerVisible ? "visible" : ""
          }`}
        >
          <h2 className="tutorials__title">
            <span className="text-orange">Tutoriales</span> Paso a Paso
          </h2>
          <p className="tutorials__subtitle">
            Aprende técnicas avanzadas de desarrollo con nuestras guías
            detalladas y ejemplos prácticos paso a paso.
          </p>
        </div>

        {/* Category Filter */}
        <div
          ref={filtersRef}
          className={`tutorials__filters ${filtersVisible ? "visible" : ""}`}
        >
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

        {/* Tutorials Grid */}
        <div className="tutorials__grid">
          {filteredTutorials.map((tutorial, index) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
              index={index}
              onSelectTutorial={setSelectedTutorial}
              getDifficultyLabel={getDifficultyLabel}
              getDifficultyColor={getDifficultyColor}
            />
          ))}
        </div>

        {/* Tutorial Modal */}
        {selectedTutorial && (
          <div className="tutorial-modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>

              <div className="modal-header">
                <div className="modal-icon">{selectedTutorial.image}</div>
                <div className="modal-info">
                  <h2 className="modal-title">{selectedTutorial.title}</h2>
                  <div className="modal-meta">
                    <span
                      className="modal-difficulty"
                      style={{
                        backgroundColor: getDifficultyColor(
                          selectedTutorial.difficulty
                        ),
                      }}
                    >
                      {getDifficultyLabel(selectedTutorial.difficulty)}
                    </span>
                    <span className="modal-duration">
                      {selectedTutorial.duration} minutos
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-body">
                <div className="tutorial-navigation">
                  <div className="step-counter">
                    Paso {currentStep + 1} de {selectedTutorial.steps.length}
                  </div>
                  <div className="step-controls">
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className="btn btn-secondary step-btn"
                    >
                      ← Anterior
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={
                        currentStep === selectedTutorial.steps.length - 1
                      }
                      className="btn btn-primary step-btn"
                    >
                      Siguiente →
                    </button>
                  </div>
                </div>

                <div className="step-content">
                  <div className="step-icon">
                    {selectedTutorial.steps[currentStep].image}
                  </div>
                  <h3 className="step-title">
                    {selectedTutorial.steps[currentStep].title}
                  </h3>
                  <p className="step-description">
                    {selectedTutorial.steps[currentStep].description}
                  </p>
                  <div className="step-time">
                    ⏱️ Tiempo estimado:{" "}
                    {selectedTutorial.steps[currentStep].time} minutos
                  </div>
                </div>

                <div className="tutorial-info">
                  <div className="info-section">
                    <h4>Materiales necesarios:</h4>
                    <ul className="materials-list">
                      {selectedTutorial.materials.map((material, index) => (
                        <li key={index} className="material-item">
                          {material}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="info-section">
                    <h4>Consejos importantes:</h4>
                    <ul className="tips-list">
                      {selectedTutorial.tips.map((tip, index) => (
                        <li key={index} className="tip-item">
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-primary">
                  Marcar como Completado
                </button>
                <button className="btn btn-secondary" onClick={closeModal}>
                  Cerrar Tutorial
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Tutorials;
