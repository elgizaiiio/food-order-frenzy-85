
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from '@/context/AuthContext';
import { PharmacyCartProvider } from '@/context/PharmacyCartContext';
import { MarketCartProvider } from '@/context/MarketCartContext';
import { PersonalCareCartProvider } from '@/context/PersonalCareCartContext';
import { CartProvider } from '@/context/CartContext';
import { UserProvider } from '@/context/UserContext';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// إنشاء عميل الاستعلام 
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <CartProvider>
              <MarketCartProvider>
                <PharmacyCartProvider>
                  <PersonalCareCartProvider>
                    <App />
                    <Toaster 
                      position="top-center"
                      richColors
                      closeButton
                      toastOptions={{
                        style: { direction: 'rtl' },
                      }}
                    />
                  </PersonalCareCartProvider>
                </PharmacyCartProvider>
              </MarketCartProvider>
            </CartProvider>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
