export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  skills: string[];
  experience: {
    position: string;
    company: string;
    period: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  contact: {
    email: string;
    linkedin?: string;
    github?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "María González",
    role: "Full Stack Developer & Co-fundadora",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    bio: "Desarrolladora apasionada con más de 5 años de experiencia en desarrollo web y mobile. Especializada en crear experiencias de usuario excepcionales y arquitecturas escalables.",
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "PostgreSQL",
      "AWS",
      "Docker",
      "Git",
    ],
    experience: [
      {
        position: "Senior Full Stack Developer",
        company: "Tech Solutions Inc",
        period: "2021 - Presente",
        description:
          "Liderazgo de equipos de desarrollo, arquitectura de aplicaciones web escalables y mentoring de desarrolladores junior.",
      },
      {
        position: "Frontend Developer",
        company: "Digital Agency",
        period: "2019 - 2021",
        description:
          "Desarrollo de interfaces modernas con React y TypeScript, optimización de rendimiento y accesibilidad web.",
      },
      {
        position: "Junior Developer",
        company: "StartUp XYZ",
        period: "2018 - 2019",
        description:
          "Desarrollo de funcionalidades frontend y backend, colaboración en proyectos ágiles.",
      },
    ],
    education: [
      {
        degree: "Ingeniería en Sistemas Computacionales",
        institution: "Universidad Tecnológica",
        year: "2018",
      },
      {
        degree: "Certificación AWS Solutions Architect",
        institution: "Amazon Web Services",
        year: "2022",
      },
    ],
    contact: {
      email: "maria@coffeebeans.com",
      linkedin: "https://linkedin.com/in/mariagonzalez",
      github: "https://github.com/mariagonzalez",
    },
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    role: "Backend Developer & Co-fundador",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Experto en arquitectura de sistemas backend y bases de datos. Apasionado por crear soluciones robustas, seguras y eficientes que escalen con el negocio.",
    skills: [
      "Node.js",
      "Python",
      "Java",
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "Kubernetes",
      "CI/CD",
    ],
    experience: [
      {
        position: "Lead Backend Engineer",
        company: "FinTech Solutions",
        period: "2020 - Presente",
        description:
          "Diseño y desarrollo de microservicios, implementación de arquitecturas cloud-native y optimización de bases de datos.",
      },
      {
        position: "Backend Developer",
        company: "E-commerce Platform",
        period: "2018 - 2020",
        description:
          "Desarrollo de APIs RESTful, integración de servicios de pago y optimización de rendimiento del servidor.",
      },
      {
        position: "Software Engineer",
        company: "Software Corp",
        period: "2016 - 2018",
        description:
          "Desarrollo de aplicaciones empresariales y automatización de procesos.",
      },
    ],
    education: [
      {
        degree: "Ingeniería en Software",
        institution: "Instituto Tecnológico Superior",
        year: "2016",
      },
      {
        degree: "Certificación Kubernetes Administrator",
        institution: "Cloud Native Computing Foundation",
        year: "2021",
      },
    ],
    contact: {
      email: "carlos@coffeebeans.com",
      linkedin: "https://linkedin.com/in/carlosrodriguez",
      github: "https://github.com/carlosrodriguez",
    },
  },
];
