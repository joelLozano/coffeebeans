import { defineConfig, type Plugin, type ResolvedConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  OG_IMAGE,
  PAGES,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  buildJsonLd,
  type PageSeo,
} from './src/seo/site'

const SEO_MARKER = '<!--seo:head-->'

const escapeAttr = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

// Bloque <head> con todas las etiquetas SEO / redes sociales de una página.
const renderSeoHead = (page: PageSeo) => {
  const url = absoluteUrl(page.path)
  const image = absoluteUrl('/' + OG_IMAGE.path)
  const title = escapeAttr(page.title)
  const description = escapeAttr(page.description)
  // "</" se escapa para que el JSON no pueda cerrar la etiqueta <script>.
  const jsonLd = JSON.stringify(buildJsonLd(page)).replace(/</g, '\\u003c')

  return `<title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${url}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />

    <!-- Open Graph (Facebook, LinkedIn, WhatsApp) -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:locale" content="${SITE_LOCALE}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="${OG_IMAGE.width}" />
    <meta property="og:image:height" content="${OG_IMAGE.height}" />
    <meta property="og:image:alt" content="${escapeAttr(OG_IMAGE.alt)}" />

    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:image:alt" content="${escapeAttr(OG_IMAGE.alt)}" />

    <!-- Datos estructurados (schema.org) -->
    <script type="application/ld+json" id="jsonld">${jsonLd}</script>`
}

const today = () => new Date().toISOString().slice(0, 10)

const renderSitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.values(PAGES)
  .map(
    (page) => `  <url>
    <loc>${absoluteUrl(page.path)}</loc>
    <lastmod>${today()}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>
`

const renderRobots = () => `User-agent: *
Allow: /

Sitemap: ${SITE_URL}sitemap.xml
`

/**
 * Genera en el build un HTML estático por ruta (index.html, contacto.html)
 * con su propio <head> SEO, además de sitemap.xml y robots.txt.
 * En desarrollo inyecta el <head> de la página de inicio.
 */
const seoPagesPlugin = (): Plugin => {
  let config: ResolvedConfig
  return {
    name: 'seo-pages',
    configResolved(resolved) {
      config = resolved
    },
    transformIndexHtml(html) {
      // En build el marcador se conserva para reemplazarlo por página al final.
      if (config.command === 'build') return html
      return html.replace(SEO_MARKER, renderSeoHead(PAGES.home))
    },
    closeBundle() {
      if (config.command !== 'build') return
      const outDir = resolve(config.root, config.build.outDir)
      const template = readFileSync(resolve(outDir, 'index.html'), 'utf-8')
      if (!template.includes(SEO_MARKER)) {
        throw new Error(`[seo-pages] No se encontró ${SEO_MARKER} en index.html`)
      }
      for (const page of Object.values(PAGES)) {
        writeFileSync(
          resolve(outDir, page.file),
          template.replace(SEO_MARKER, renderSeoHead(page))
        )
      }
      writeFileSync(resolve(outDir, 'sitemap.xml'), renderSitemap())
      writeFileSync(resolve(outDir, 'robots.txt'), renderRobots())
    },
  }
}

// https://vite.dev/config/
// El sitio se publica como GitHub Pages de proyecto en
// https://joellozano.github.io/coffeebeans/, por lo que la ruta base
// debe ser el nombre del repositorio (no la URL completa de GitHub).
export default defineConfig({
  plugins: [react(), seoPagesPlugin()],
  base: '/coffeebeans/',
})
