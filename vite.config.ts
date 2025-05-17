import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: true,
    // تحسين استجابة الخادم
    watch: {
      usePolling: false,
    },
    // تمكين ضغط GZIP للحصول على استجابة أسرع
    cors: true
  },
  plugins: [
    react({
      // تحسينات لـ SWC
      plugins: [],
      tsDecorators: true
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    // تحسين تقسيم الشيفرات
    modulePreload: true, 
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('@radix-ui') || id.includes('lucide-react')) {
              return 'vendor-ui';
            }
            if (id.includes('react-hook-form') || id.includes('zod')) {
              return 'vendor-forms';
            }
            if (id.includes('tanstack')) {
              return 'vendor-query';
            }
            return 'vendor';
          }
        }
      }
    },
    // تسريع عملية البناء وتقليل حجم الملفات
    assetsInlineLimit: 5120,
    sourcemap: false,
    emptyOutDir: true,
    // تقليل حجم CSS
    cssCodeSplit: true
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      '@tanstack/react-query',
      'lucide-react',
      'framer-motion'
    ],
    // تمكين التحسين المسبق للتبعيات
    esbuildOptions: {
      target: 'esnext',
      splitting: true,
      treeShaking: true,
      legalComments: 'none',
      charset: 'utf8',
      logLevel: 'error'
    }
  },
  // تمكين تفتيت الملفات الكبيرة
  preview: {
    port: 4173,
    host: true,
    cors: true,
    open: false
  },
  // تسريع عمليات المعالجة
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    legalComments: 'none',
    target: 'esnext',
    treeShaking: true
  }
}));
