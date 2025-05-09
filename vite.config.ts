
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // تمكين Hot Module Replacement لتحديثات سريعة
    hmr: true
  },
  plugins: [
    react({
      jsxImportSource: 'react',
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
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': [
            'react', 
            'react-dom',
            'react-router-dom',
          ],
          'ui': [
            'framer-motion',
            'lucide-react',
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-avatar'
          ],
          'form-components': [
            'react-hook-form',
            'zod',
            '@hookform/resolvers'
          ]
        }
      }
    },
    // تحسينات إضافية لتسريع التحميل
    assetsInlineLimit: 4096, // دمج الملفات الصغيرة كـ base64
    chunkSizeWarningLimit: 1000, // زيادة حد التحذير لحجم الملفات
    reportCompressedSize: false, // تسريع عملية البناء
    // تحسينات للتطبيقات المحمولة
    sourcemap: false, // تعطيل الـ sourcemaps للإنتاج لتقليل حجم الملفات
    emptyOutDir: true, // إفراغ مجلد المخرجات قبل البناء
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    esbuildOptions: {
      target: 'esnext', // استخدام أحدث الميزات المتاحة
    }
  },
  // تحسينات خاصة بالهواتف المحمولة
  preview: {
    port: 4173,
    host: true
  }
}));
