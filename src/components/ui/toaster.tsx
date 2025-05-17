
import { Toaster } from "sonner";

export function Toaster() {
  return (
    <Toaster 
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
