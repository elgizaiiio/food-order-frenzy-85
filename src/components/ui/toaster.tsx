
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster 
      position="top-center"
      toastOptions={{
        style: {
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '14px',
        },
        duration: 3000,
      }}
    />
  );
}
