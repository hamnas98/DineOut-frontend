import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/swiggy': {
        target: 'https://www.swiggy.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/swiggy/, ''),
        // ✅ Rewrite cookie domain so browser stores Swiggy's session cookies for localhost
        cookieDomainRewrite: 'localhost',
        // ✅ Also strip "secure" flag so cookies work over http://localhost
        cookiePathRewrite: '/',
        headers: {
          Referer: 'https://www.swiggy.com/',
          Origin: 'https://www.swiggy.com',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes, req) => {
            // Log status + whether cookies came back, for debugging
            console.log(
              `[PROXY] ${req.method} ${req.url} → ${proxyRes.statusCode}`,
              proxyRes.headers['set-cookie'] ? '(cookies set)' : '(no cookies)'
            )
          })
        },
      },
    },
  },
})