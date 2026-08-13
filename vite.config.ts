import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

// Custom plugin to make main CSS non-render-blocking
function nonRenderBlockingCss(): Plugin {
  return {
    name: 'non-render-blocking-css',
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet" crossorigin href="(\/assets\/index-[^"]+\.css)">/g,
        `<link rel="preload" href="$1" as="style" />
<link rel="stylesheet" href="$1" media="print" onload="this.media='all'" />
<noscript><link rel="stylesheet" href="$1" /></noscript>`
      );
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), nonRenderBlockingCss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    esbuild: {
      target: 'es2022',
      legalComments: 'none',
    },
    build: {
      target: 'es2022',
      cssTarget: 'es2022',
      cssCodeSplit: true,
      modulePreload: {
        polyfill: false,
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('jspdf') || id.includes('html2canvas') || id.includes('canvg') || id.includes('html2pdf')) {
                return 'pdf-vendor';
              }
              if (id.includes('recharts') || id.includes('d3-')) {
                return 'charts-vendor';
              }
              if (id.includes('lucide-react')) {
                return 'icons-vendor';
              }
            }
          },
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
