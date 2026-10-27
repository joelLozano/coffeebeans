import { useEffect } from "react";
import { absoluteUrl, buildJsonLd, type PageSeo } from "./site";

const setAttr = (selector: string, attr: string, value: string) => {
  document.head.querySelector(selector)?.setAttribute(attr, value);
};

/**
 * Sincroniza el <head> con la página activa cuando se navega dentro de la
 * SPA. El HTML estático de cada ruta ya trae estas etiquetas desde el build;
 * esto solo las mantiene correctas tras la navegación del lado del cliente.
 */
export const usePageMeta = (page: PageSeo) => {
  useEffect(() => {
    const url = absoluteUrl(page.path);

    document.title = page.title;
    setAttr('meta[name="description"]', "content", page.description);
    setAttr('link[rel="canonical"]', "href", url);
    setAttr('meta[property="og:url"]', "content", url);
    setAttr('meta[property="og:title"]', "content", page.title);
    setAttr('meta[property="og:description"]', "content", page.description);
    setAttr('meta[name="twitter:title"]', "content", page.title);
    setAttr('meta[name="twitter:description"]', "content", page.description);

    const jsonLd = document.getElementById("jsonld");
    if (jsonLd) jsonLd.textContent = JSON.stringify(buildJsonLd(page));
  }, [page]);
};
