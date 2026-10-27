// Configuración SEO central del sitio.
// La usan tanto el build (vite.config.ts → genera los HTML estáticos, el
// sitemap y robots.txt) como la app (usePageMeta → actualiza el <head> al
// navegar). Cambia aquí la URL si el sitio pasa a un dominio propio.

/** URL pública absoluta del sitio, con "/" final. */
export const SITE_URL = "https://joellozano.github.io/coffeebeans/";

export const SITE_NAME = "Coffee Beans";
export const SITE_LOCALE = "es_MX";
export const CONTACT_EMAIL = "hola@coffeebeans.dev";

export const OG_IMAGE = {
  path: "og-image.png",
  width: 1200,
  height: 630,
  alt: "Coffee Beans: desarrollo web, apps móviles, software a medida y agentes de IA",
};

export interface PageSeo {
  /** Ruta del router, p. ej. "/" o "/contacto". */
  path: string;
  /** Archivo HTML que se genera en dist/ para esta ruta. */
  file: string;
  title: string;
  description: string;
}

export const PAGES = {
  home: {
    path: "/",
    file: "index.html",
    title: "Coffee Beans | Desarrollo Web, Apps Móviles y Agentes de IA",
    description:
      "Desarrollamos sitios web, apps móviles, software a medida, plugins de WordPress y agentes de IA que impulsan tu negocio. Solicita una cotización personalizada.",
  },
  contacto: {
    path: "/contacto",
    // GitHub Pages sirve /coffeebeans/contacto desde contacto.html con
    // estado 200 (antes caía en 404.html y devolvía un 404 real).
    file: "contacto.html",
    title: "Contacto y Cotización | Coffee Beans",
    description:
      "Cuéntanos sobre tu proyecto de desarrollo web, app móvil, software a medida o IA y recibe una cotización personalizada. Respondemos en menos de 24 horas.",
  },
} satisfies Record<string, PageSeo>;

export const SERVICES = [
  {
    name: "Desarrollo Web",
    description:
      "Sitios web modernos y responsivos con las últimas tecnologías y mejores prácticas.",
  },
  {
    name: "Apps Móviles",
    description:
      "Aplicaciones nativas e híbridas para iOS y Android con experiencia excepcional.",
  },
  {
    name: "Software Personalizado",
    description:
      "Soluciones de software a medida que se adaptan perfectamente a tu negocio.",
  },
  {
    name: "Plugins de WordPress",
    description:
      "Plugins de WordPress a medida para ampliar y personalizar las funcionalidades de tu sitio.",
  },
  {
    name: "Agentes de IA & Automatizaciones",
    description:
      "Agentes inteligentes y automatizaciones para optimizar procesos y escalar operaciones.",
  },
];

/** URL absoluta de una ruta del sitio ("/" → SITE_URL). */
export const absoluteUrl = (path: string): string =>
  SITE_URL + path.replace(/^\//, "");

/** Datos estructurados (JSON-LD) de una página. */
export const buildJsonLd = (page: PageSeo) => {
  const orgId = `${SITE_URL}#organization`;
  const siteId = `${SITE_URL}#website`;
  const pageUrl = absoluteUrl(page.path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/icon-512.png"),
          width: 512,
          height: 512,
        },
        image: absoluteUrl("/" + OG_IMAGE.path),
        description: PAGES.home.description,
        email: CONTACT_EMAIL,
        areaServed: "Worldwide",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: CONTACT_EMAIL,
          availableLanguage: ["es"],
        },
        knowsAbout: SERVICES.map((s) => s.name),
        makesOffer: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.name,
            description: s.description,
            provider: { "@id": orgId },
          },
        })),
        // Agrega aquí las URLs de tus perfiles reales (LinkedIn, Instagram…)
        // cuando existan; Google las usa para vincular la marca.
        // sameAs: ["https://www.linkedin.com/company/…"],
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "es-MX",
        publisher: { "@id": orgId },
      },
      {
        "@type": page.path === "/contacto" ? "ContactPage" : "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: page.title,
        description: page.description,
        inLanguage: "es-MX",
        isPartOf: { "@id": siteId },
        about: { "@id": orgId },
        primaryImageOfPage: absoluteUrl("/" + OG_IMAGE.path),
      },
    ],
  };
};
