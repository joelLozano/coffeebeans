import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// El sitio se publica como GitHub Pages de proyecto en
// https://joellozano.github.io/coffeebeans/, por lo que la ruta base
// debe ser el nombre del repositorio (no la URL completa de GitHub).
export default defineConfig({
  plugins: [react()],
  base: '/coffeebeans/',
})
