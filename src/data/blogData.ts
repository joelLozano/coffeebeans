export interface BlogPost {
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

export interface Category {
  id: string;
  label: string;
}

export const categories: Category[] = [
  { id: "all", label: "Todos" },
  { id: "desarrollo", label: "Desarrollo" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "mobile", label: "Móvil" },
  { id: "tendencias", label: "Tendencias" },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "React 19: Guía Completa de las Nuevas Características",
    excerpt:
      "Descubre las últimas funcionalidades de React 19 y cómo pueden mejorar tu desarrollo frontend.",
    content:
      "React 19 introduce cambios revolucionarios en el ecosistema de desarrollo frontend. Desde el nuevo compilador React hasta las mejoras en Server Components, esta versión promete transformar la manera en que construimos aplicaciones web modernas...",
    fullContent:
      "React 19 representa un salto cuántico en el desarrollo de aplicaciones React, introduciendo características que redefinen completamente la experiencia de desarrollo.",
    tableOfContents: [
      { id: "introduccion", title: "Introducción a React 19", level: 1 },
      { id: "compilador", title: "Nuevo Compilador React", level: 1 },
      {
        id: "optimizaciones",
        title: "Optimizaciones de Rendimiento",
        level: 2,
      },
      {
        id: "server-components",
        title: "Server Components Mejorados",
        level: 1,
      },
      { id: "hooks", title: "Nuevos Hooks", level: 1 },
      { id: "migration", title: "Guía de Migración", level: 1 },
      { id: "best-practices", title: "Mejores Prácticas", level: 1 },
      { id: "conclusion", title: "Conclusiones", level: 1 },
    ],
    category: "frontend",
    author: "Carlos Méndez",
    authorRole: "Senior Frontend Developer",
    authorBio:
      "Especialista en React con más de 8 años de experiencia en desarrollo frontend. Lead developer en proyectos enterprise y speaker internacional.",
    authorAvatar: "CM",
    authorSocial: {
      linkedin: "carlos-mendez-dev",
      twitter: "carlosmendez_dev",
      github: "carlos-mendez",
    },
    date: "2024-03-15",
    readTime: 8,
    image: "⚙️",
    featured: true,
    tags: ["react", "frontend", "javascript", "desarrollo web"],
    likes: 342,
    views: 5280,
    relatedPosts: ["2", "6"],
  },
  {
    id: "2",
    title: "Node.js y Microservicios: Arquitectura Escalable",
    excerpt:
      "Explora cómo implementar una arquitectura de microservicios robusta con Node.js y tecnologías modernas.",
    content:
      "Los microservicios han revolucionado la manera en que desarrollamos aplicaciones escalables. Con Node.js como base, podemos construir servicios independientes, mantenibles y altamente disponibles que se comunican eficientemente...",
    fullContent:
      "La arquitectura de microservicios representa un cambio paradigmático en el desarrollo de aplicaciones, permitiendo crear sistemas distribuidos altamente escalables y resilientes.",
    tableOfContents: [
      {
        id: "introduccion",
        title: "Introducción a Microservicios",
        level: 1,
      },
      { id: "nodejs-ventajas", title: "Ventajas de Node.js", level: 1 },
      { id: "arquitectura", title: "Diseño de Arquitectura", level: 1 },
      { id: "comunicacion", title: "Comunicación entre Servicios", level: 2 },
      { id: "gestion-datos", title: "Gestión de Datos", level: 2 },
      { id: "deployment", title: "Despliegue y Monitoring", level: 1 },
      { id: "casos-uso", title: "Casos de Uso Prácticos", level: 1 },
    ],
    category: "backend",
    author: "María González",
    authorRole: "Arquitecta de Software",
    authorBio:
      "Especialista en arquitecturas distribuidas y sistemas escalables. Lead architect con más de 10 años de experiencia en empresas Fortune 500.",
    authorAvatar: "MG",
    authorSocial: {
      linkedin: "maria-gonzalez-architect",
      twitter: "maria_codes",
      github: "maria-gonzalez",
    },
    date: "2024-03-10",
    readTime: 6,
    image: "🌎",
    featured: false,
    tags: ["nodejs", "microservicios", "backend", "arquitectura"],
    likes: 287,
    views: 4150,
    relatedPosts: ["4", "1"],
  },
  {
    id: "3",
    title: "Flutter vs React Native: Guía Completa 2024",
    excerpt:
      "Aprende las diferencias clave entre Flutter y React Native para elegir la mejor opción para tu proyecto móvil.",
    content:
      "El desarrollo móvil multiplataforma se ha vuelto esencial en la era digital actual. Flutter y React Native lideran este espacio, cada uno con sus fortalezas y casos de uso específicos...",
    fullContent:
      "La elección entre Flutter y React Native puede determinar el éxito de tu proyecto móvil. Esta guía completa te ayudará a tomar la decisión correcta.",
    tableOfContents: [
      {
        id: "introduccion",
        title: "Desarrollo Móvil Multiplataforma",
        level: 1,
      },
      {
        id: "flutter-overview",
        title: "Flutter: Ventajas y Características",
        level: 1,
      },
      {
        id: "react-native-overview",
        title: "React Native: Fortalezas",
        level: 1,
      },
      { id: "comparativa", title: "Comparativa Detallada", level: 1 },
      { id: "rendimiento", title: "Rendimiento y Optimización", level: 2 },
      { id: "ecosistema", title: "Ecosistema y Comunidad", level: 2 },
      { id: "casos-uso", title: "Cuándo Usar Cada Uno", level: 1 },
      { id: "recomendaciones", title: "Recomendaciones Finales", level: 1 },
    ],
    category: "mobile",
    author: "Ana Ruiz",
    authorRole: "Mobile Developer Lead",
    authorBio:
      "Experta en desarrollo móvil con especialidad en Flutter y React Native. Ha desarrollado más de 20 apps publicadas en App Store y Google Play.",
    authorAvatar: "AR",
    authorSocial: {
      linkedin: "ana-ruiz-mobile",
      twitter: "ana_mobile_dev",
      github: "ana-ruiz",
    },
    date: "2024-03-05",
    readTime: 5,
    image: "📱",
    featured: true,
    tags: ["flutter", "react native", "mobile", "comparativa"],
    likes: 456,
    views: 6890,
    relatedPosts: ["1", "6"],
  },
  {
    id: "4",
    title: "Docker y Kubernetes: Containerización para Desarrolladores",
    excerpt:
      "Análisis detallado de cómo Docker y Kubernetes revolucionan el deployment de aplicaciones.",
    content:
      "En el mundo del desarrollo moderno, la containerización se ha vuelto fundamental. Docker y Kubernetes representan las tecnologías líder que permiten desarrollar, desplegar y escalar aplicaciones de manera eficiente...",
    fullContent:
      "La containerización ha transformado completamente el desarrollo y despliegue de software, proporcionando consistencia, escalabilidad y eficiencia sin precedentes.",
    tableOfContents: [
      { id: "introduccion", title: "Introducción a Containers", level: 1 },
      { id: "docker-fundamentos", title: "Docker: Fundamentos", level: 1 },
      { id: "dockerfile", title: "Creando Dockerfiles", level: 2 },
      { id: "docker-compose", title: "Docker Compose", level: 2 },
      { id: "kubernetes-intro", title: "Kubernetes: Orquestación", level: 1 },
      { id: "pods-services", title: "Pods y Services", level: 2 },
      { id: "deployment", title: "Strategies de Deployment", level: 2 },
      { id: "best-practices", title: "Mejores Prácticas DevOps", level: 1 },
    ],
    category: "desarrollo",
    author: "Roberto Silva",
    authorRole: "DevOps Engineer",
    authorBio:
      "Ingeniero DevOps con certificaciones en AWS y Google Cloud. Especialista en infraestructura como código y pipelines CI/CD.",
    authorAvatar: "RS",
    authorSocial: {
      linkedin: "roberto-silva-devops",
      twitter: "roberto_devops",
      github: "roberto-silva",
    },
    date: "2024-02-28",
    readTime: 10,
    image: "📦",
    featured: false,
    tags: ["docker", "kubernetes", "containers", "devops"],
    likes: 198,
    views: 3420,
    relatedPosts: ["2", "5"],
  },
  {
    id: "5",
    title: "Tendencias de Desarrollo 2024: IA, Edge Computing y Más",
    excerpt:
      "Descubre las principales tendencias tecnológicas que marcarán el desarrollo de software en 2024.",
    content:
      "El mundo de la tecnología está en constante evolución, y 2024 promete ser un año emocionante con nuevas tendencias que están redefiniendo la industria del software. Desde IA generativa hasta edge computing...",
    fullContent:
      "Las tendencias tecnológicas de 2024 están redefiniendo el panorama del desarrollo de software, abriendo nuevas posibilidades y desafíos para los desarrolladores.",
    tableOfContents: [
      { id: "resumen-2024", title: "Resumen del Año 2024", level: 1 },
      { id: "ia-generativa", title: "IA Generativa en Desarrollo", level: 1 },
      { id: "edge-computing", title: "Edge Computing", level: 1 },
      { id: "web3", title: "Web3 y Blockchain", level: 1 },
      { id: "low-code", title: "Plataformas Low-Code/No-Code", level: 1 },
      { id: "sostenibilidad", title: "Desarrollo Sostenible", level: 2 },
      { id: "futuro", title: "El Futuro del Desarrollo", level: 1 },
    ],
    category: "tendencias",
    author: "Laura Jiménez",
    authorRole: "Tech Lead & Innovation",
    authorBio:
      "Líder técnica especializada en emerging technologies y innovation management. Speaker internacional en conferencias tech.",
    authorAvatar: "LJ",
    authorSocial: {
      linkedin: "laura-jimenez-tech",
      twitter: "laura_tech_lead",
      github: "laura-jimenez",
    },
    date: "2024-02-20",
    readTime: 7,
    image: "📈",
    featured: true,
    tags: ["2024", "inteligencia artificial", "edge computing", "futuro"],
    likes: 523,
    views: 8940,
    relatedPosts: ["1", "3"],
  },
  {
    id: "6",
    title: "TypeScript Avanzado: Tipos Condicionales y Utilidades",
    excerpt:
      "Guía paso a paso para dominar los tipos condicionales y utilidades avanzadas de TypeScript.",
    content:
      "TypeScript ha evolucionado significativamente, ofreciendo herramientas poderosas para crear código type-safe y mantenible. Los tipos condicionales y las utilidades avanzadas representan el siguiente nivel...",
    fullContent:
      "TypeScript avanzado te permite crear sistemas de tipos sofisticados que mejoran drásticamente la seguridad y mantenibilidad de tu código.",
    tableOfContents: [
      {
        id: "fundamentos",
        title: "Fundamentos de Tipos Avanzados",
        level: 1,
      },
      { id: "tipos-condicionales", title: "Tipos Condicionales", level: 1 },
      { id: "mapped-types", title: "Mapped Types", level: 2 },
      { id: "template-literals", title: "Template Literal Types", level: 2 },
      { id: "utility-types", title: "Utility Types Avanzados", level: 1 },
      { id: "infer", title: "Keyword 'infer'", level: 2 },
      { id: "practical-examples", title: "Ejemplos Prácticos", level: 1 },
      { id: "performance", title: "Performance y Debugging", level: 1 },
    ],
    category: "desarrollo",
    author: "Diego Herrera",
    authorRole: "TypeScript Specialist",
    authorBio:
      "Desarrollador senior especializado en TypeScript y arquitecturas type-safe. Contribuidor activo a proyectos open source de TypeScript.",
    authorAvatar: "DH",
    authorSocial: {
      linkedin: "diego-herrera-ts",
      twitter: "diego_typescript",
      github: "diego-herrera",
    },
    date: "2024-02-15",
    readTime: 9,
    image: "🎨",
    featured: false,
    tags: ["typescript", "tipos", "avanzado", "utilidades"],
    likes: 234,
    views: 3850,
    relatedPosts: ["1", "2"],
  },
];
