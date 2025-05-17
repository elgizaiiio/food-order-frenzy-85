
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import App from './App.tsx'
import './index.css'

// إنشاء عميل استعلام لـ React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <App />
          <Toaster position="top-center" richColors closeButton />
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
